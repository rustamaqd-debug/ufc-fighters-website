# Implementation Plan: MMA Fight History Tables & Official UFC Rankings Update

We will update the UFC Portal with the official UFC rankings as of July 2026 and add a comprehensive **MMA Fight History Table** (История поединков) for each fighter, modeled after official Wikipedia and Sherdog professional records.

## User Review Required

> [!IMPORTANT]
> - **Detailed Fight History Table**: Each fighter detail modal will feature an interactive, color-coded **"Статистика в смешанных единоборствах"** table:
>   - **Summary Box**: Total fights, Wins (KO/SUB/DEC), Losses (KO/SUB/DEC).
>   - **Full Career Table**: Columns for `Результат` (Win/Loss), `Рекорд`, `Соперник` (with country flag), `Способ`, `Турнир`, `Дата`, `Раунд`, `Время`, `Место`, and `Примечание`.
>   - Green highlight (`#1e3a29`) for victories, red highlight (`#3a1e22`) for losses.
> - **Desktop & GitHub Deployment Sync**: All updated files (`index.html`, `styles.css`, `fighters.js`, `app.js`) will be automatically updated both in the workspace and directly on the user's **Desktop** (`C:\Users\user\Desktop\ufc-fighters-website`) for seamless GitHub uploading.

---

## Proposed Changes

### UFC Portal Component

#### [MODIFY] [fighters.js](file:///C:/Users/user/.gemini/antigravity/scratch/ufc-fighters-website/fighters.js)
- Update rankings and division assignments based on July 2026 UFC rankings.
- Add `fightHistory` array to fighter profiles containing detailed fight-by-fight records.

#### [MODIFY] [index.html](file:///C:/Users/user/.gemini/antigravity/scratch/ufc-fighters-website/index.html)
- Add a new tab or section inside the Fighter Detail Modal: **"История боев в ММА"**.
- Add the Summary Table and Full Career History Table layout.

#### [MODIFY] [styles.css](file:///C:/Users/user/.gemini/antigravity/scratch/ufc-fighters-website/styles.css)
- Add CSS styling for `.fight-history-table`, `.row-win`, `.row-loss`, `.history-summary-box`, `.result-badge-win`, and `.result-badge-loss`.

#### [MODIFY] [app.js](file:///C:/Users/user/.gemini/antigravity/scratch/ufc-fighters-website/app.js)
- Update modal render function to dynamically generate the Fight History Table for whichever fighter is clicked.

---

## Verification Plan

### Manual Verification
1. Open the updated modal for fighters like Conor McGregor, Jon Jones, Islam Makhachev, Alex Pereira.
2. Verify that the **Статистика в смешанных единоборствах** table renders with correct win/loss colors, opponent flags, event names, dates, methods, and fight notes.
3. Verify that the project files on the Desktop are synced and ready for GitHub upload.
