const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'Vw2kgrUiVmGRIjdI2ipE98t1wGzqcXqK',
    db : 'ers_db',
    passcode_key : 'YOUAREADMIN',
}

const production = {
    name : 'production',
    asset_path : process.env.ERS_ASSET_PATH,
    session_cookie_key : process.env.ERS_SESSION_COOKIE_KEY,
    db : process.env.ERS_DB,
    passcode_key : process.env.ERS_PASSCODE_KEY,
}

// module.exports = development;

// module.exports = eval(process.env.ERS_ENVIRONMENT) == undefined ? development : eval(process.env.ERS_ENVIRONMENT);

let selectedConfig;

if (process.env.NODE_ENVIRONMENT === 'production') {
    selectedConfig = production;
} else {
    selectedConfig = development;
}


module.exports = selectedConfig;
