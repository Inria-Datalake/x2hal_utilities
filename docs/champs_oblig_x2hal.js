function checkFields() {

    const requiredFields = {
        article: ['title', 'author', 'journal', 'year', 'language', 'x-domain'],
        inproceedings: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain', 'x-conferencestartdate', 'language'],
        conference: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain', 'x-conferencestartdate', 'language'],
        poster: ['title', 'author', 'booktitle', 'address', 'year', 'x-domain', 'x-conferencestartdate', 'language'],
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

        const regex = /(\w[\w-]*)\s*=/g;

        let match;
        while ((match = regex.exec(raw)) !== null) {
            fields[match[1].toLowerCase()] = true;
        }

        if (requiredFields[type]) {

            const missing = requiredFields[type].filter(f => {

                // Accepte language OU x-language
                if (f === 'language') {
                    return !('language' in fields) && !('x-language' in fields);
                }

                return !(f in fields);
            });

            // Vérification du champ langue
            let languageError = null;

            const langMatch = raw.match(
                /(?:x-language|language)\s*=\s*[\{\(]\s*([^}\),\s]+)\s*[\}\)]/i
            );

            if (langMatch) {

                const langValue = langMatch[1].trim();

                // ISO 639-1 : exactement 2 lettres
                if (!/^[a-z]{2}$/i.test(langValue)) {
                    languageError =
                        "champ langue : utiliser un code ISO 639-1 sur 2 lettres (fr, en, de, es...)";
                }
            }

            if (missing.length > 0 || languageError) {

                let msgs = [];

                if (missing.length > 0) {
                    msgs.push(missing.join(", "));
                }

                if (languageError) {
                    msgs.push(languageError);
                }

                output += `❌ ${id} (${type}) → ${msgs.join(" ; ")}\n`;

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