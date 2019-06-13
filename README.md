# Multiply pages based on vue-cli3.x

## Versions
### Multiple pages based on vue-cli3.x
[based on vue-cli3.x](https://github.com/sknightq/vue-mpc/tree/master)
### Multiple pages based on vue-cli2.x
[based on vue-cli2.x](https://github.com/sknightq/vue-mpc/tree/vue-cli2.x)

## Description
Because of the update of the vue-cli, I upated my project. Thanks for the vue-cli3.x, I found that configure the multiple pages was easier. However, since my company's structure, I add many custom settings.
> 1. Add a new cli : `npm run site`
> 2. In build/prebuild, I use the template of nginx config file to create a new configuration for production, which is deployed in docker
> 3. Add v-router for some entries     

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### Compiles and minifies for specified site
```
npm run site --name=[site-name]
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
## TODO List
- [ ] add a demo
- [ ] remove unuseful file in demo
- [ ] using Chinese
- [ ] modify my english syntax
- [ ] more detail