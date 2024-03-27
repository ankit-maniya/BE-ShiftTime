class EmailTempletes {
    createShiftIsCreatedEmail = async ({ info }) => {
        const description = info?.description || "This is Description Area For Shift";
        const title = info?.subject || "Shift Has Been Created!";

        return `
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title>${title}</title>
                <style>
                    table, td, div, h1, p {
                    font-family: Arial, sans-serif;
                    }
                    @media screen and (max-width: 530px) {
                    .unsub {
                        display: block;
                        padding: 8px;
                        margin-top: 14px;
                        border-radius: 6px;
                        background-color: #555555;
                        text-decoration: none !important;
                        font-weight: bold;
                    }
                    .col-lge {
                        max-width: 100% !important;
                    }
                    }
                    @media screen and (min-width: 531px) {
                    .col-sml {
                        max-width: 27% !important;
                    }
                    .col-lge {
                        max-width: 73% !important;
                    }
                    }
                </style>
            </head>
            <body style="margin:0;padding:0;word-spacing:normal;background-color:#44a755;">
                <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#44a755;">
                    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">
                        <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                            <tr>
                            <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" width="165" alt="ShiftTime" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <h1 style="text-align:center;margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">${title}</h1>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <p style="margin:0;">${description}</p>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                                <p style="margin:0;font-size:14px;line-height:20px;">&reg; ShiftTime 2024</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </div>
            </body>
        </html>
        `;
    }

    createAvailabilityStatusChangeEmail = ({ info }) => {
        const description = info?.description || "Your Shift Availability Status has been changed.";
        const title = info?.title || "Availability Status Change!";

        return `
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title>${title}</title>
                <style>
                    table, td, div, h1, p {
                    font-family: Arial, sans-serif;
                    }
                    @media screen and (max-width: 530px) {
                    .unsub {
                        display: block;
                        padding: 8px;
                        margin-top: 14px;
                        border-radius: 6px;
                        background-color: #555555;
                        text-decoration: none !important;
                        font-weight: bold;
                    }
                    .col-lge {
                        max-width: 100% !important;
                    }
                    }
                    @media screen and (min-width: 531px) {
                    .col-sml {
                        max-width: 27% !important;
                    }
                    .col-lge {
                        max-width: 73% !important;
                    }
                    }
                </style>
            </head>
            <body style="margin:0;padding:0;word-spacing:normal;background-color:#44a755;">
                <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#44a755;">
                    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">
                        <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                            <tr>
                            <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" width="165" alt="ShiftTime" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <h1 style="text-align:center;margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">${title}</h1>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <p style="margin:0;">${description}</p>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                                <p style="margin:0;font-size:14px;line-height:20px;">&reg; ShiftTime 2024</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </div>
            </body>
        </html>
        `;
    }

    createBookoffStatusChangeEmail = ({ info }) => {
        const description = info?.description || "Your Book Off Status has been changed.";
        const title = info?.title || "BookOff Status Change!";

        return `
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title>${title}</title>
                <style>
                    table, td, div, h1, p {
                    font-family: Arial, sans-serif;
                    }
                    @media screen and (max-width: 530px) {
                    .unsub {
                        display: block;
                        padding: 8px;
                        margin-top: 14px;
                        border-radius: 6px;
                        background-color: #555555;
                        text-decoration: none !important;
                        font-weight: bold;
                    }
                    .col-lge {
                        max-width: 100% !important;
                    }
                    }
                    @media screen and (min-width: 531px) {
                    .col-sml {
                        max-width: 27% !important;
                    }
                    .col-lge {
                        max-width: 73% !important;
                    }
                    }
                </style>
            </head>
            <body style="margin:0;padding:0;word-spacing:normal;background-color:#44a755;">
                <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#44a755;">
                    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">
                        <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                            <tr>
                            <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" width="165" alt="ShiftTime" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <h1 style="text-align:center;margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">${title}</h1>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                                <a href="https://firebasestorage.googleapis.com/v0/b/jaybhagvati-b46f5.appspot.com/o/logo.png?alt=media&token=75e8f46e-c856-4fab-b09d-3ab551eb8f64" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                                <p style="margin:0;">${description}</p>
                            </td>
                            </tr>
                            <tr>
                            <td style="padding:30px;text-align:center;font-size:12px;background-color:#404040;color:#cccccc;">
                                <p style="margin:0;font-size:14px;line-height:20px;">&reg; ShiftTime 2024</p>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </div>
            </body>
        </html>
        `;
    }
}

export default new EmailTempletes();
