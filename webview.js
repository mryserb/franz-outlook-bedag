module.exports = (Franz) => {

    const justifyText = function(twoColumnLinesArray) {
        let countLine = function(columns) { let lineCount = 0; columns.forEach(function (column) { lineCount += column.length }); return lineCount; };

        let longestLineCount = 0;
        twoColumnLinesArray.forEach(function (columns) { let lineCount = countLine(columns); if (lineCount > longestLineCount) { longestLineCount = lineCount; }});

        let justifiedText = "";
        twoColumnLinesArray.forEach(function (columns) {
            justifiedText += columns[0];
            for (let i = 0; i < longestLineCount - countLine(columns) + 5; i++) { justifiedText += " "; }
            justifiedText += columns[1];
            justifiedText += "\n";
        });

        return justifiedText;
    };

    let shownNotifications = {};
    const getNotifications = function getNotifications() {
        const notifications = jQuery("div.o365cs-notifications-reminders-container");
        if (notifications.length === 0) {
            shownNotifications = {};
        }
        notifications.each(function( index ) {
            const notification = jQuery(this);
            const title = jQuery(notification).find("span.o365cs-notifications-reminders-title").text();
            const notificationRows = jQuery(notification).find("span.o365cs-notifications-reminders-row");
            const bodyRows = [];
            notificationRows.each(function(index) {
                bodyRows.push([jQuery(this).find("div.o365cs-notifications-reminders-leftColumn").text().trim(), jQuery(this).find("div.o365cs-notifications-reminders-rightColumn").text().trim()]);
            });

            const bodyText = justifyText(bodyRows);
            if (shownNotifications[bodyText] === undefined) {
                new Notification(title, { body: bodyText, requireInteraction: true });
                shownNotifications[bodyText] = "shown";
            }
        });
    };

    const getMessages = function getMessages() {
        const unreadMail = jQuery("span[title*='Posteingang'] + div > span").first().text();
        Franz.setBadge(unreadMail);
        getNotifications();
    };
    Franz.loop(getMessages);
};
