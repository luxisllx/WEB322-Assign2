const categories=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({image:'./img/skin.jpg',description:`Skincare`,price:`1349.99`});
    
        this.fakeDB.push({image:'./img/makeup.jpg',description:`Beauty `,price:`1749.99`});
    
        this.fakeDB.push({image:'./img/bag.jpg',description:`Luxury Handbag`,price:`1949.99`});

        this.fakeDB.push({image:'./img/ring.jpg',description:`Jewelry`,price:`1949.99`});

    },

    getAllCategories()
    {

        return this.fakeDB;
    }

}

categories.init();
module.exports=categories;