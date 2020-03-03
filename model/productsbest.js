const productsbest=
{
    fakeDB:[],

    init()
    {

        this.fakeDB.push({title: 'Tom Ford Sakura',image:'./img/lip1.jpg',category:`Category: Lips`,price:`$70.00`, bestseller: true});
    
        this.fakeDB.push({title: 'YSL Rouge Volupte', image:'./img/lip2.jpg',category:`Category: Lips`,price:`$55.00`, bestseller: true});
    
        this.fakeDB.push({title: 'Guerlain Rouge G', image:'./img/lip3.jpg',category:`Category: Lips`,price:`$45.00`, bestseller: false});

        this.fakeDB.push({title: 'Mac Satin', image:'./img/lip4.jpg',category:`Category: Lips`,price:`$30.00`, bestseller: false});

        this.fakeDB.push({title: 'Charlotte Tilbury Satin', image:'./img/lip5.jpg',category:`Category: Lips`,price:`$60.00`, bestseller: true});

        this.fakeDB.push({title: 'Givenchy Lunar', image:'./img/lip6.jpg',category:`Category: Lips`,price:`$60.00`,bestseller: true});

        this.fakeDB.push({title: 'Dior Lip Shine', image:'./img/lip7.jpg',category:`Category: Lips`,price:`$50.00`,bestseller: false});

        this.fakeDB.push({title: 'Becca Ultimate Love', image:'./img/lip8.jpg',category:`Category: Lips`,price:`$55.00`,bestseller: false});

        this.fakeDB.push({title: 'Chanel Royale ', image:'./img/best1.jpg',category:`Category: Lips`,price:`$90.00`,bestseller: true});

    },

    getAllProductsbest()
    {

        return this.fakeDB;
    }

}

productsbest.init();
module.exports=productsbest;