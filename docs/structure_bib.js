function checkStructure() {

    const text = document.getElementById("input").value;
    const lines = text.split('\n');

    let errors = [];
    let errorLines = new Set();

    let inEntry = false;
    let current_entry = "";

    if (text.length > 100000) {
        alert("Texte trop long");
        return;
    }

    let firstNonEmpty = lines.find(l => l.trim() !== "");

    if (firstNonEmpty && !firstNonEmpty.trim().startsWith('@')) {
        document.getElementById("output").textContent =
            "Erreur : le fichier ne commence pas par une entrée BibTeX (@...).";
        return;
    }

    for (let i = 0; i < lines.length; i++) {

        let line = lines[i];
        if (line.trim() === "") continue;

        let trimmed = line.trim();

        if (trimmed.startsWith('@')) {

            if (inEntry) {
                errors.push(`[${current_entry}] ligne ${i+1} : accolade fermante manquante`);
                errorLines.add(i);
            }

            inEntry = true;

            let start = trimmed.indexOf('{');
            let end = trimmed.indexOf(',', start);

            current_entry = (start !== -1 && end !== -1)
                ? trimmed.slice(start + 1, end).trim()
                : "entrée inconnue";

            continue;
        }

        if (trimmed.includes('=')) {

            let parts = trimmed.split('=');
            let field_value = parts.slice(1).join('=').trim();

            let isError =
                !field_value.endsWith(',') ||
                (field_value.startsWith('{') && !field_value.includes('}')) ||
                (field_value.startsWith('(') && !field_value.includes(')'));

            if (isError) {
                errors.push(`[${current_entry}] ligne ${i+1} : champ suspect`);
                errorLines.add(i);
            }

            continue;
        }

        if (trimmed === '}' || trimmed === '},') {
            inEntry = false;
            continue;
        }

        if (inEntry) {
            errors.push(`[${current_entry}] ligne ${i+1} : structure incorrecte`);
            errorLines.add(i);
        }
    }

    // 🌿 OUTPUT TEXTE
    if (errors.length === 0) {
        document.getElementById("output").innerHTML =
            '<span class="success">✔ Aucune erreur détectée 🌿</span>';
    } else {
        document.getElementById("output").textContent = errors.join('\n');
    }

    // 🌿 SURBRILLANCE
    let highlighted = lines.map((line, i) => {
        if (errorLines.has(i)) {
            return `<span class="error">${escapeHTML(line)}</span>`;
        }
        return escapeHTML(line);
    }).join('\n');

    let box = document.getElementById("highlighted");
    box.innerHTML = highlighted;

    if (errors.length === 0) {
        box.style.border = "2px solid #00ff88";
    } else {
        box.style.border = "none";
    }
}

/* escape HTML */
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}