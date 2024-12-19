function toSocialPage(id) {
    const urls = [
        'https://facebook.com',
        'https://linkedin.com',
        'https://instagram.com',
        'https://example.com/user'
    ];

    if (id >= 1 && id <= 4) {
        window.open(urls[id - 1], '_blank');
    }
}