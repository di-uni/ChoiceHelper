import PostSelection from "../models/postSelection.js";

export const getAllPosts = async (req, res) => {
    try {
        const postSelections = await PostSelection.find().sort( { "createdAt": -1 } ).exec();
        
        // 200: OK
        res.status(200).json(postSelections);
        console.log("GET DONE!"); 
        // console.log("GET DONE! \nSorted data:"); 
        // console.log(postSelections);
    } catch (error) {
        // 404: Not Found
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }
}

export const getRecentPosts = async (req, res) => {
    try {
        const postSelections = await PostSelection.find().limit(6).sort( { "createdAt": -1 } ).exec();
        // const postSelections = await PostSelection.find().exec();
        
        // 200: OK
        res.status(200).json(postSelections);
        console.log("GET DONE! \nSorted data:"); 
        // console.log("GET DONE! \nSorted data:"); 
        // console.log(postSelections);
    } catch (error) {
        // 404: Not Found
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }
}

export const getCount = async (req, res) => {
    try {
        const count = await PostSelection.find().count();
        
        // 200: OK
        res.status(200).json(count);
        console.log("GET COUNT DONE! : ", count); 
    } catch (error) {
        // 404: Not Found
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostSelection(post);

    try {
        await newPost.save();

        // learn more about status codes 
        // at: https://www.restapitutorial.com/httpstatuscodes.html
        // 201: created
        res.status(201).json(newPost);
        console.log("POST DONE!"); 
        // console.log(newPost);
    } catch (error) {
        // 409: Conflict
        res.status(409).json({ message: error.message });
        console.log(error.message);
    }
}

// export const countPosts = async (req, res) => {
//     try {
//         // const postSelections = await PostSelection.find();
//         var query = PostSelection.find();
//         query.count(function (err, count) {
//             if (err) console.log(err)
//             else {
//                 console.log("Count:", count);
//                 res.status(200).json(count);
//             }
//         });
        

//         // console.log(postSelections.count());
//     } catch (error) {
//         // 409: Conflict
//         res.status(409).json({ message: error.message });
//         console.log(error.message);
//     }
// }