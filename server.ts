import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '30mb' }));

  // Shared Gemini client instance
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Cartoonize proxy endpoint using Gemini
  app.post('/api/ai/cartoonize', async (req, res) => {
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server.',
      });
    }

    try {
      const { imageBase64, mimeType = 'image/jpeg', style = 'comic' } = req.body;

      if (!imageBase64) {
        return res.status(400).json({ error: 'Image data is required' });
      }

      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

      let styleDesc = 'vibrant comic book style with bold dark ink outlines and clean pop-art colors';
      if (style === 'anime') {
        styleDesc = 'clean Japanese anime style with smooth cel-shading, vibrant eyes, and soft colorful tones';
      } else if (style === '3d') {
        styleDesc = '3D Pixar and Disney animated movie character render style with volumetric soft clay lighting';
      } else if (style === 'retro') {
        styleDesc = 'classic retro 1990s Saturday morning 2D cartoon style with thick black outlines and flat vibrant fills';
      }

      const prompt = `Convert this photograph into a stylized ${styleDesc}. Keep the original subject, pose, and identifiable facial features recognizable, but transform the rendering completely into a high-quality cartoon illustration.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let cartoonImageUrl: string | null = null;
      let textNote = '';

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            cartoonImageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          } else if (part.text) {
            textNote += part.text;
          }
        }
      }

      if (cartoonImageUrl) {
        return res.json({ success: true, image: cartoonImageUrl, note: textNote });
      } else {
        return res.status(422).json({
          error: 'Model did not return image data.',
          details: textNote,
        });
      }
    } catch (err: any) {
      console.error('Error generating AI cartoon:', err);
      const isQuota =
        err?.message?.includes('429') ||
        err?.message?.includes('quota') ||
        err?.message?.includes('RESOURCE_EXHAUSTED') ||
        err?.status === 429;

      return res.status(isQuota ? 429 : 500).json({
        error: isQuota
          ? 'AI Image model quota exceeded. Switching to our built-in instant cartoon engine!'
          : (err?.message || 'Failed to process AI cartoon'),
        isQuota,
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Toonify server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
