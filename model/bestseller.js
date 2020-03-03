const bestseller=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({image:'./img/best1.jpg',description:`Chanel Royale Lipstick`,price:``});
    
        this.fakeDB.push({image:'./img/best2.jpg',description:`Century Fountain Pen `,price:``});
    
        this.fakeDB.push({image:'./img/best3.jpg',description:`Chanel Chance Perfume`,price:``});

        this.fakeDB.push({image:'./img/ring1.jpg',description:`Cremorlab Cushion`,price:``});

    },

    getAllBestseller()
    {

        return this.fakeDB;
    }

}

bestseller.init();
module.exports=bestseller;