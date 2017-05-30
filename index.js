#!/usr/bin/env node

'use strict';

const _ = require("lodown-dlnnewman");
const customers = require("./data/customers.json");

// 1. Find the number of males

    var innerMaleAction = function (ell, x, arr) {
        if (ell['gender'] === 'male') return true;
    };

    var isMale = _.filter(customers, innerMaleAction);

    // Answer:

    var numberMales = isMale.length;
    console.log(numberMales); // prints 3

// 2. Find the number of females

    var innerFemaleAction = function (ell, x, arr) {
        if (ell['gender'] === 'female') return true;
    };
    
    var isFemale = _.filter(customers, innerFemaleAction);
    
    //Answer:
    
    var numberFemales = isFemale.length;
    console.log(numberFemales); //prints 4
    
// 3. Find the name and age of the oldest customer

    var findAge = function (ell, x, arr) {
        return ell['age'];
    };
    
    var giveAges = _.map(customers, findAge);
    
    var maxAge = Math.max.apply(null, giveAges);
    
    var oldPeepsArray = [];
    
    _.map(customers, function (ell, x, arr) {
        if (ell['age'] === maxAge) {
            oldPeepsArray.push((ell['name']) + ' ' + (ell['age']));
        }
    });
    
    var oldestPerson = oldPeepsArray;

    console.log(oldestPerson); // prints [ 'Buckner Kennedy 40' ]

// 4. Find the name and age of the youngest customer

    var minAge = Math.min.apply(null, giveAges);
    
    var youngPeepsArray = [];
    
    _.map(customers, function (ell, x, arr) {
        if (ell['age'] === minAge) {
            youngPeepsArray.push((ell['name']) + ' ' + (ell['age']));
        }
    });
    
    var youngestPerson = youngPeepsArray;

    console.log(youngestPerson); // Prints [ 'Doyle Erickson 22', 'Doris Smith 22']

// 5. Find the average balance of all the customers

    var newNumArray = [];
    
    _.map(customers, function(ell, x, arr){
        newNumArray.push(ell['balance']);
    });
    
    var newStringArray = [];
    
    _.map(newNumArray, function(ell, x, arr){
        newStringArray.push(ell.slice(1, 2) + ell.slice(3, ell.length));
    });
    
    var convertStringsToNum = [];
    
    _.map(newStringArray, function(ell, x, arr){
        convertStringsToNum.push(parseFloat(ell));
    });
    
    var balancesAllTotaled = 0;
    
    _.map(convertStringsToNum, function(ell, x, arr){
        balancesAllTotaled += ell;
    });
    
    var avgBalanceRaw = balancesAllTotaled / (customers.length);
    var avgBalanceNum = Math.round(100 * avgBalanceRaw) / 100;
    var avgBalance = "$" + avgBalanceNum.toString();
    
    console.log(avgBalance); // prints $2240.26

// 6. Find how many customers' names begin with an arbitrary letter.
// Write a function to answer this question, then log an answer.

var howManyLetters = function(array, letter) {

    var firstLetterArray = [];
    
    _.map(array, function(ell, x, arr){
        firstLetterArray.push((ell['name'][0]).toLowerCase());
    });

    var firstLetter = function (ell, x, arr) {
        if (ell === (letter.toLowerCase())) return true;
    };

    return (_.filter(firstLetterArray, firstLetter)).length;

};

    console.log(howManyLetters(customers, 'S')); //prints 2
    console.log(howManyLetters(customers, 'a')); //prints 1
    console.log(howManyLetters(customers, 'R')); //prints 0

// 7. Find how many customers' friends' names begin with an arbitrary letter.
// Write a function to answer this question, then log an answer.


var friendsLetters = function(array, letter) {

    var friendsLettersArray = [];

    _.map(array, function(ell, x, arr){
        _.map(ell['friends'], function(ell, x, arr) {
             friendsLettersArray.push((ell['name']));  
        });
    });
    
    var uniqueFriendsLettersArray = _.unique(friendsLettersArray);
    
    var newFriendsLettersArray = [];
    
    _.map(uniqueFriendsLettersArray, function (ell, x, arr){
        newFriendsLettersArray.push(ell[0].toLowerCase());
    });

    var firstLetter = function (ell, x, arr) {
        if (ell === (letter.toLowerCase())) return true;
    };
        
    return (_.filter(newFriendsLettersArray, firstLetter)).length;

};
    
    console.log(friendsLetters(customers, 'J')); //prints 2
    console.log(friendsLetters(customers, 'x')); //prints 0
    console.log(friendsLetters(customers, 'b')); //prints 1

// 8. Find the names of all customers who are friends with a given customer 
// (by name). i.e. Which customers have that customer's name in their friends list?

var inFriends = function(array, friend) {

    var namesArray = [];
    
        _.map(array, function(ell, x, arr){
            namesArray.push(ell['name']);
        });
    
    var friendsArray = [];
    
        if (_.contains(namesArray, friend) === true) {
            
            _.map(array, function (ell, x, arr){
               
               _.map(ell['friends'], function (innerEll, innerX, innerArr){
                   
                   if ((innerEll['name']) === friend) {
                       friendsArray.push((ell['name']));
                   }
               
               }); 
        
            }); 
        
        }
    return friendsArray;    
};

    console.log(inFriends(customers, 'Olga Newton')); // prints [ 'Doyle Erickson', 'Doris Smith' ]
    console.log(inFriends(customers, 'Shelly Walton')); // prints [ 'Olga Newton' ]
    console.log(inFriends(customers, 'Adele Mullen')); // prints []


// 9. Find the top 3 most common tags among the customers.
    
    var newTagsArray = [];
        
        _.map(customers, function(ell, x, arr){
          _.map(ell['tags'], function (tagName) {
              newTagsArray.push(tagName);
          });
        });

    var countedTags = newTagsArray.reduce(function (allTags, tag) { 
        if (tag in allTags) {
            allTags[tag]++;
      }
        else {
            allTags[tag] = 1;
      }
      return allTags;
    }, {});
    
    var orderedTags = [];

    var maxVal = 0;
    
    _.map(countedTags, function(val, key, coll){
        
        if (val >= maxVal) {
            orderedTags.unshift(key);
            maxVal = val;
        }
        
        else if (val < maxVal) {
            orderedTags.push(key);
        }
    });
    
    var topThreeTags = _.first(orderedTags, 3);
    
    console.log(topThreeTags); //prints [ 'veniam', 'aliqua', 'Lorem' ]

// 10.  Create a summary of genders, the output should be:
//
//      {
//          male: 3,
//          female: 4,
//          transgender: 1
//      }
//
//      You should solve this using reduce().

    var gendersArr = [];
    
        _.map(customers, function(ell, x, arr){
            gendersArr.push(ell['gender']);    
    });
    
    var countedGenders = gendersArr.reduce(function (allGenders, gender) { 
        if (gender in allGenders) {
            allGenders[gender]++;
      }
        else {
            allGenders[gender] = 1;
       }
      return allGenders;
    }, {});

    console.log(countedGenders); // prints {female: 4, male: 3, transgender: 1}

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
