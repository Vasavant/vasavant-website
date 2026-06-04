import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background:
            'linear-gradient(135deg, #071427 0%, #0f172a 45%, #2563eb 100%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          padding: '56px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(248, 250, 252, 0.14)',
            borderRadius: '36px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '999px',
                background: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '34px',
                fontWeight: 700,
              }}
            >
              V
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '22px', letterSpacing: '0.24em' }}>
                VASAVANT
              </div>
              <div style={{ fontSize: '20px', color: 'rgba(248,250,252,0.78)' }}>
                Operational Intelligence Studio
              </div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              maxWidth: '840px',
            }}
          >
            <div style={{ fontSize: '64px', fontWeight: 700, lineHeight: 1.04 }}>
              Turn scattered operations into structured intelligence.
            </div>
            <div
              style={{
                fontSize: '28px',
                lineHeight: 1.35,
                color: 'rgba(248,250,252,0.82)',
              }}
            >
              Systems, automation, and AI-assisted workflows for logistics,
              field teams, sales operations, and execution visibility.
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '20px',
              color: 'rgba(248,250,252,0.72)',
            }}
          >
            <div>vasavant.io</div>
            <div>Spanish-first. Search-ready. Share-ready.</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}