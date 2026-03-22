import fs from 'node:fs/promises';
import path from 'node:path';

async function readLegacyBody(fileName) {
  const filePath = path.join(process.cwd(), 'works-content', 'legacy-bodies', fileName);
  return fs.readFile(filePath, 'utf8');
}

export default async function LegacyPage({ bodyFile, cssFile, scriptFile }) {
  const bodyHtml = await readLegacyBody(bodyFile);
  const visibilityPanelAnchorScript = `
    (function () {
      function syncVisibilityPanelPosition() {
        var roverBtn = document.getElementById("visibilityBtn");
        var panel = document.getElementById("accessibilityPanel");
        if (!roverBtn || !panel) return;

        var rect = roverBtn.getBoundingClientRect();
        var gap = 10;
        var left = Math.round(rect.right + gap) + "px";
        var bottom = Math.max(8, Math.round(window.innerHeight - rect.bottom)) + "px";

        panel.style.setProperty("left", left, "important");
        panel.style.setProperty("bottom", bottom, "important");
        panel.style.setProperty("right", "auto", "important");
      }

      function initVisibilityPanelAnchor() {
        syncVisibilityPanelPosition();
        window.addEventListener("resize", syncVisibilityPanelPosition);
        window.addEventListener("scroll", syncVisibilityPanelPosition, { passive: true });

        var roverBtn = document.getElementById("visibilityBtn");
        if (roverBtn) {
          roverBtn.addEventListener("click", function () {
            setTimeout(syncVisibilityPanelPosition, 0);
          });
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initVisibilityPanelAnchor);
      } else {
        initVisibilityPanelAnchor();
      }

      window.addEventListener("load", syncVisibilityPanelPosition);
    })();
  `;

  return (
    <>
      <link rel="stylesheet" href={`/${cssFile}`} />
      <link rel="stylesheet" href="/responsive.css" />
      <main dangerouslySetInnerHTML={{ __html: bodyHtml }} suppressHydrationWarning />
      <script dangerouslySetInnerHTML={{ __html: visibilityPanelAnchorScript }} />
      {scriptFile ? <script src={`/${scriptFile}`} /> : null}
    </>
  );
}
