/* =================================================== */
/*          DIA IT SUPPORT- People Announcements       */
/* =================================================== */
/*                                                     */
/*   © 2018 Piotr Biller                               */
/*                                                     */
/*   piotr.biller@contractors.roche.com                */
/*   piotr.biller@billennium.pl                        */
/*                                                     */
/* =================================================== */

function RawPostModel(link, title, date) {
    this.link = link;
    this.title = title;
    this.date = date;
}

function PostModel(data) {
    this.rawPostModels = [];
    for (var i = 0; i < data.length; i++) {
        this.rawPostModels.push(new RawPostModel(data[i][0], data[i][1], data[i][2]));
    }
}
