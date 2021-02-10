function exclude(arr,exc){
    var new_arr = [];

    for(var i=0;i<arr.length;i++){
        match = false;
        for(var j=0;j<exc.length;j++){
            if( arr[i] == exc[j]){
                match = true;
                break;
            }
        }
        if(!match){
            new_arr.push(arr[i]);
        }
    }
    return new_arr;
}
var arr = [1,2,3,4,5,6];
var exc = [2,6]
var new_array = exclude(arr,exc);
console.log("For array:["+arr+"], exclude: ["+exc+"], new_array:",new_array);
 
const movies = [{title: "aaa", year:2017, rating:8},
{title: "bbb", year:2018, rating:9},
{title: "ccc", year:2020, rating:10},
{title: "ddd", year:2000, rating:6},
{title: "eee", year:2004, rating:4}]

movies.sort((a,b) => 
    (a.year < b.year ? 1: -1)
);
console.log("For movies:"+movies+", movies with minimum rating of 7:")
for(var i=0;i<movies.length;i++){
    if(movies[i].rating > 7){
        console.log("Title:"+movies[i].title+" Year:"+movies[i].year);
    }
}

arr = [1,1,1,1,4,4,1,1,1,1,5,6,7,8];
item = 1;

function search_array(arr,item){
    var count = 0;
    for(var i=0;i<arr.length;i++){
        if(arr[i] == item){
            count += 1;
        }
    }
    return count;
}
console.log("For array search: ["+arr+"] with item: ["+item +"], search count: "+search_array(arr,item));