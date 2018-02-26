/* =================================================== */
/*          DIA IT SUPPORT- Show notification          */
/* =================================================== */
/*                                                     */
/*   © 2018 Piotr Biller                               */
/*                                                     */
/*   piotr.biller@contractors.roche.com                */
/*   piotr.biller@billennium.pl                        */
/*                                                     */
/* =================================================== */

function RawPostModel(date, author, subject, content,id,archived, type) {
  this.date = date;
  this.author = author;
  this.subject = subject;
  this.content = content;
  this.id = id;
  this.archived = archived;
  this.type = type;
}

function PostModel(data)
{
   this.rawPostModels = [];
   for(var i=0;i<data.length;i++){
      this.rawPostModels.push(new RawPostModel(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6]));
    }
 }
