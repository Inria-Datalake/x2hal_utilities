function checkFields() {

    const requiredFields = {
        article: ['title', 'author', 'journal', 'year', 'language', 'x-domain'],
        inproceedings: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain','x-conferencestartdate', 'language'],
        conference: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain','x-conferencestartdate', 'language'],
        poster: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain','x-conferencestartdate', 'language'],
        proceedings: ['title', 'author', 'year', 'x-domain', 'language'],
        incollection: ['title', 'author', 'booktitle', 'year', 'language', 'x-domain'],
        inbook: ['title', 'author', 'booktitle', 'year', 'language', 'x-domain'],
        book: ['title', 'author', 'year', 'x-audience', 'language', 'x-popularlevel'],
        phdthesis: ['x-title_fr', 'x-title_en', 'author', 'x-dateDefended', 'x-abstract_fr', 'x-abstract_en', 'school', 'year', 'x-director', 'language', 'type', 'x-domain'],
        unpublished: ['title', 'author', 'year', 'comment', 'x-domain', 'language'],
        misc: ['title', 'author', 'year', 'note', 'language', 'x-domain'],
        techreport: ['title', 'author', 'year', 'x-reporttype', 'language', 'x-domain'],
        patent: ['title', 'author', 'year', 'x-country', 'language', 'x-domain']
    };

    const input = document.getElementById("input").value;

    const entries = input.split('@').slice(1);
    let output = "";

    entries.forEach(raw => {
        const typeMatch = raw.match(/^(\w+)/);
        const idMatch = raw.match(/\{\s*([^,]+)/);

        if (!typeMatch || !idMatch) return;

        const type = typeMatch[1].toLowerCase();
        const id = idMatch[1];

        let fields = {};
        const regex = /(\w[\w-]*)\s*=\s*\{/g;

        let match;
        while ((match = regex.exec(raw)) !== null) {
            fields[match[1].toLowerCase()] = true;
        }

        if (requiredFields[type]) {
            const missing = requiredFields[type].filter(f => !(f in fields));

            if (missing.length > 0) {
                output += `❌ ${id} (${type}) → ${missing.join(", ")}\n`;
            } else {
                output += `✅ ${id} OK\n`;
            }
        } else {
            output += `⚠️ Type inconnu : ${type}\n`;
        }
    });

    document.getElementById("output").textContent =
        output || "Aucune entrée détectée.";
}