module.exports = (Franz) => {
    const getMessages = function getMessages() {
        const unreadMail = jQuery("span[title*='Posteingang'] + div > span").first().text();
        Franz.setBadge(unreadMail);
    };
    Franz.loop(getMessages);
};
