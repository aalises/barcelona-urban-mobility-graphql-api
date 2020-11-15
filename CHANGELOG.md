## [0.3.1](https://github.com/aalises/barcelona-urban-mobility-graphql-api/compare/v0.2.1...v0.3.1) (2020-11-15)


### Bug Fixes

* **filters:** filtering bike stations now allows compound filtering by 2+ properties ([e18add0](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/e18add056180298a9ce5d7976abee32a1d784b9c))


### Features

* **caching:** add caching hints to the fields ([1ab9d03](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/1ab9d030d0e89b2218557f599bfda7742b6bb838))
* **changelog:** add command in package for generating the changelog ([09e2e91](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/09e2e9137750be59f8fc2e618d531c2814f60b40))
* **coverage:** add test coverage information ([a853dc4](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/a853dc448c91f0fccd2692790653ab9c66b1ad04))
* **findby:** add findBy closest station input parameter ([e82dbec](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/e82dbec2f3332c2789c8ba103345becb8cbf94d9))
* **queries:** add bikeStation query ([5ac22ad](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/5ac22ad2fb204d4002078e32c6655ff74300a2f1))



## [0.2.1](https://github.com/aalises/barcelona-urban-mobility-graphql-api/compare/v0.2.0...v0.2.1) (2020-11-14)


### Bug Fixes

* **codegen:** change the local codegen path ([3171f6d](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/3171f6d356142d2d0fd564171bcb8473179892a9))


### Features

* **datasources:** create common data source for the TMB API ([fd03497](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/fd03497530417cd819d60e97d35905fb11455bd0))
* **filter:** add filtering bike stations by hasAvailableDocks ([f0ad193](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/f0ad1935f6e15767aa26de0c6d3e3caf75066b3a))
* **queries:** add filter stations by line ([352bff9](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/352bff923a38754dac65de87197b55c0cdaed153))
* **queries:** add the ability to find a metroStation by name ([4b0b676](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/4b0b676766a2d080276239f31ebbee981b210bcf))
* **queries:** create BikeStations query ([5ed07a6](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/5ed07a6e4b70fddef849b6b3786d27884beabd92))
* **queries:** create metroLine query ([3b14210](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/3b142107238068a2e02aa265d78695584a066dca))
* **queries:** create metroLines query ([160c955](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/160c9554fb1cd2f90c602f3a41d66c1544d246f4))
* **query:** add metroStation query ([792a63b](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/792a63baa2def2a09b197fa4d0e39a890a52835f))
* **readme:** adjust run section with the new lambda functions ([fd5d489](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/fd5d4896c142c3b3a25aed483da337713e0731a7))



# [0.0.0-alpha](https://github.com/aalises/barcelona-urban-mobility-graphql-api/compare/c170475d48fadddf59a9a442ae5d76572050b320...v0.0.0-alpha) (2020-10-18)


### Bug Fixes

* **dev:** do not use webpack for development mode ([6c989dc](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/6c989dc1d183a418a0de80a9c60af5388e09acd3))
* **eslint:** fix eslint configuration and add eslintignore ([4b7d599](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/4b7d59977dd13397ead57f58a5e5583b1c099dfa))
* **gitignore:** ignore dist folder ([4ebfce7](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/4ebfce7b054301a0edc7fb1b304ac7c71530fd6b))
* **query:** change name of object field in metroStations query, add editor light theme ([3780a2e](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/3780a2ec56575c06e7f706adb379edffd76f5878))


### Features

* **ci:** add basic ci configuration with github actions ([090d0e9](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/090d0e9ad2aa7712426eb6aee9a5eb0db3b829c9))
* **datasources:** add data source for metro stations ([455affa](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/455affa4b0ca566c257b1b8b0d33590378e0792d))
* **datasources:** add reducer to convert from API response to our schema ([9e3d143](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/9e3d143b13d49cca2076ddc738a243cb91752be0))
* **deploy:** deploy to netlify functions ([ad24254](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/ad242547dacaf43c7ed7888799f0e785688fcb13))
* **errors:** add formatError utility to treat apollo errors ([26dd8f9](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/26dd8f93c84130aaab347ff403ac893cfe554d10))
* **init:** initial commit ([c170475](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/c170475d48fadddf59a9a442ae5d76572050b320))
* **query:** add metroStations query ([c9c9e89](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/c9c9e89542bfcb0471fef4977884a08b90a4128e))
* **readme:** add link to application hosted on Netlify ([6817b21](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/6817b21342e49c18865e35c55a749c9cac1aae73))
* **test:** add tests for the metro stations reducers ([ab5eed7](https://github.com/aalises/barcelona-urban-mobility-graphql-api/commit/ab5eed7277bb4b8c20715a2d354a89db2aadee32))



