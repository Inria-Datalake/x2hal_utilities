// ==============================
// SCHÉMA (autonome UI uniquement)
// ==============================

const docTypeSchema = {
    article: {
        title: "",
        author: "",
        journal: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    inproceedings: {
        title: "",
        author: "",
        booktitle: "{Titre de la conférence}",
        address: "{Ville, Pays}",
        year :"{AAAA},",
        "x-conferencestartdate": "{AAAA} ou {AAAA-MM-JJ}",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    conference: {
        title: "",
        author: "",
        booktitle: "{Titre de la conférence}",
        address: "{Ville, Pays}",
        year :"{AAAA},",
        "x-conferencestartdate": "{AAAA} ou {AAAA-MM-JJ}",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    poster: {
        title: "",
        author: "",
        booktitle: "{Titre de la conférence}",
        address: "{Ville, Pays}",
        year :"{AAAA},",
        "x-conferencestartdate": "{AAAA} ou {AAAA-MM-JJ}",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },
    

    proceedings: {
        title: "",
        author: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    incollection: {
        title: "",
        author: "",
        booktitle: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    inbook: {
        title: "",
        author: "",
        booktitle: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"
    },

    book: {
        title: "",
        author: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},",
        note : "{Valeurs possibles du sous-type : OUV.CRIT, OUV.MANUAL, OUV.SYNTOUV,OUV.DICTIONARY},"
    },

    phdthesis: {
        "x-title_fr": "{Obligatoire si titre en anglais}",
        "x-title_en": "{Obligatoire si titre en français}",
        author: "{Nom, Prénom}",
        "x-dateDefended": "{AAAA-MM-JJ}",
        "x-abstract_fr": "{Résumé en français}",
        "x-abstract_en": "{Abstract in English}",
        school: "{Université}",
        year :"{AAAA},",
        "x-director" : "{Prénom Nom de la directrice de thèse},",
        "x-language": "ISO 639-1, exemple : {en}",
        type : "{Valeurs possibles : thèse, thesis, Habilitation à  Diriger des Recherches ou HDR},",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"

    },


    techreport: {
        title: "",
        author: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},",
        institution : "{Nom de l'institution},",
        "x-reporttype" : "{Valeurs possibles du sous-type : 'Rapport de recherche, Research Report, Rapport Technique, Technical Report, Rapport d\' expert, Expert report,Contract, Contrat,DMP},",
    },

    patent: {
        title: "",
        author: "",
        year: "",
        "x-country": "{FR - code pays sur 2 caractères}",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},"        
    },

    unpublished: {
        title: "",
        author: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},",       
        comment :"{Valeurs possibles du sous-type : UNDEFINED.PREPRINT,UNDEFINED.WORKINGPAPER}",
    },

    misc: {
        title: "",
        author: "",
        year: "",
        "x-language": "ISO 639-1, exemple : {en}",
        "x-domain" : "{liste des domaines consultable sur AuréHAL},",   
        note : "{valeurs possibles: OTHER, ISSUE, NOTICE, TRAD, BLOG},"

    }
};


// ==============================
// INIT MENU
// ==============================

window.addEventListener("DOMContentLoaded", initDocTypeSelect);

function initDocTypeSelect() {

    const select = document.getElementById("docType");
    if (!select) return;

    select.innerHTML = `<option value="">-- sélectionner --</option>`;

    Object.keys(docTypeSchema).forEach(type => {

        const opt = document.createElement("option");
        opt.value = type;
        opt.textContent = type;

        select.appendChild(opt);
    });
}


// ==============================
// RENDER CHAMPS
// ==============================

window.renderFields = function () {

    const select = document.getElementById("docType");
    const container = document.getElementById("fieldsInfo");

    if (!select || !container) return;

    const type = select.value;

    if (!type || !docTypeSchema[type]) {
        container.innerHTML = "";
        return;
    }

    const fields = docTypeSchema[type];

    let html = `<div class="doc-type">@${type}</div>`;

    for (const [field, description] of Object.entries(fields)) {

        const value = description || "{obligatoire},";

        html +=
            `<div class="field-line">` +
                `<span class="field-name">${field}</span>` +
                `<span class="eq">=</span>` +
                `<span class="field-value">${value}</span>` +
            `</div>`;
    }

    container.innerHTML = html;
};

// ==============================
// RESET
// ==============================

window.resetDocTypeUI = function () {

    const select = document.getElementById("docType");
    const container = document.getElementById("fieldsInfo");

    if (select) select.value = "";
    if (container) container.innerHTML = "";
};