function RawPostModel(name, url) {
  this.name = name;
  this.url = url;
}

function PostModel(data)
{
   this.rawPostModels = [];
   for(var i=0;i<data.length;i++){
      this.rawPostModels.push(new RawPostModel(data[i][0],data[i][1]));
    }
 }

