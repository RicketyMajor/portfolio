const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Nothing playing is a state the widget already renders, so it doubles as the degraded payload.
const NOT_PLAYING = { isPlaying: false };

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }).toString(),
  });

  return response.json();
};

export default async function handler(req, res) {
  // Same contract as the other handlers: a missing credential degrades, it never throws.
  if (!client_id || !client_secret || !refresh_token) {
    return res.status(200).json(NOT_PLAYING);
  }

  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return res.status(200).json(NOT_PLAYING);
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json(NOT_PLAYING);
    }

    const song = await response.json();

    if (!song.item) {
      return res.status(200).json(NOT_PLAYING);
    }

    // A podcast episode carries `show` where a track carries `album`, and a local file carries
    // neither, so nothing below the item itself can be assumed to exist.
    return res.status(200).json({
      album: song.item.album?.name ?? '',
      albumImageUrl: song.item.album?.images?.[0]?.url ?? null,
      artist: (song.item.artists ?? []).map((_artist) => _artist.name).join(', '),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls?.spotify ?? null,
      title: song.item.name,
    });

  } catch (error) {
    console.error("Spotify API Catch:", error);
    return res.status(200).json(NOT_PLAYING);
  }
}
