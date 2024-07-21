import { Context } from 'hono';

export const fetchFileFromGitHub = async (c: Context, fileName: string) => {
  const GITHUB_TOKEN = c.env.GITHUB_TOKEN;
  const response = await fetch(`https://github.com/sathwik49/AVPlayer-media/blob/main/${fileName}`, {
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  return response;
};
