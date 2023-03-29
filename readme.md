# Knestjs

Knestjs search to be a Nestjs ORM in which you write the models once and only once.
This is done creating migrations automatically from the models that you create.

[![codecov](https://codecov.io/gh/Dracks/knestjs/branch/main/graph/badge.svg?token=5ZD6Q7O2HF)](https://codecov.io/gh/Dracks/knestjs)
[![CodeFactor](https://www.codefactor.io/repository/github/dracks/knestjs/badge)](https://www.codefactor.io/repository/github/dracks/knestjs)

## Todo
The following list is the main points I will like to address to consider the library in version 1

* [x] creation and deletion of indexes
  * [x] Use change the property to the column name of indexes
* [ ] tools to access the models directly (Extra package using objection?)  
* [ ] Keep the ordering of the fields on modifications (Adding the after in the alter table)
* [ ] Add the option to generate the migrations in typescript
* [ ] Add the option to automatically change the properties and/or classes casing (f.e.: automatically transform to snake_case)
* [x] Split types for the declarations one that is the used in the interfaces, and another to work internally
* [ ] Handle column mutation
* [ ] Handle index mutation
* [ ] Handle partial indexes

As a general Idea, I will like to provide 3 packages, one is the current @knestjs/core, one should provide direct interface to knex to use it for doing the queries, and the third one should provide ObjectionJs
