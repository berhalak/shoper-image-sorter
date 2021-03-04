module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                webPreferences: {
                    webSecurity: false
                }
            }
        }
    }
}