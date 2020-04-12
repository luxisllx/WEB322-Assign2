const beautyCategories=
{
    fakeDB:[],

    

    init()
    {

        this.fakeDB.push({title: ' ',image:'./img/cat1.jpg',description:`Lips`,price:`1349.99`});
    
        this.fakeDB.push({title: ' ', image:'./img/cat2.jpg',description:`Face`,price:`1749.99`});
    
        this.fakeDB.push({title: ' ', image:'./img/cat3.jpg',description:`Eyes`,price:`1949.99`});

        this.fakeDB.push({title: ' ', image:'./img/sale2.png',description:`Sale`,price:`1949.99`});

        

    },

    getAllProducts()
    {

        return this.fakeDB;
    }

}

beautyCategories.init();
module.exports=beautyCategories;