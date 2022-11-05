import Router from "express";

const router = Router()

const routes = {
    Firebase : '/firebase/',
    Fs : '/fs/',
    Memory : '/memory/',
    MongoDb : '/mongodb/',
    Sqlite : '/sqlite/',
}


const getPath = router.use((req, res, next) => {
    const url = req.baseUrl;
    const arrayRoutes = Object.entries(routes)

    let path;
    
    arrayRoutes.forEach(([key, value]) => {
        if (url.includes(value)) {
            path = key;
        }
    });
    
    res.locals.path = path
    
    next();
})

export default getPath