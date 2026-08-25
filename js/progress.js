fetch('progress.csv')
    .then(response => response.text())
    .then(text => {
        const lines = text.trim().split(/\r?\n/);

        // Your CSV has an Excel-generated A,B,C,D line first,
        // so the actual data is on the third line.
        const values = lines[2].split(',');

        const project = values[0].trim();
        const total = parseFloat(values[1]);
        const installed = parseFloat(values[2]);
        const percent = parseFloat(values[3]);

        const box = document.createElement('div');
        box.id = 'project-progress';

        box.innerHTML = `
            <div class="progress-title">${project}</div>

            <div class="progress-percent">${percent.toFixed(1)}%</div>
            <div class="progress-label">PIPELINE INSTALLED</div>

            <div class="progress-bar">
                <div class="progress-fill" style="width:${percent}%"></div>
            </div>

            <div class="progress-stats">
                <span><b>${installed.toFixed(1)} ft</b> installed</span>
                <span><b>${total.toFixed(1)} ft</b> total</span>
            </div>
        `;

        document.body.appendChild(box);
    })
    .catch(error => console.error('Progress data could not be loaded:', error));