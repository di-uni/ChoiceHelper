import PostSelection from "../models/postSelection.js";
import redis_client from "../index.js";

export const getAllPosts = async (req, res) => {
    try {
        const postSelections = await PostSelection.find().sort( { "createdAt": -1 } ).exec();
        
        // 200: OK
        res.status(200).json(postSelections);
        console.log("GET all posts DONE!"); 
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
        console.log("GET Recent Posts DONE!"); 
        // console.log(postSelections);
    } catch (error) {
        // 404: Not Found
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }
}


export const getCount = async (req, res) => {
    try {
        const data = await redis_client.get('count');
        if (data != null) {
            console.log("Get the count value in redis!"); 
            res.status(200).json(parseInt(data) + 1);
        } else {
            // Redis에 저장된게 없을 때 db에서 값 불러오기
            try {
                const count = await PostSelection.find().count();
                
                // 200: OK
                res.status(200).json(count);
                console.log("GET count DONE! : ", count); 
                await redis_client.set('count', count);
                console.log("Save the count value in redis!"); 
            } catch (error) {
                // 404: Not Found
                res.status(404).json({ message: error.message });
                console.log(error.message);
            }
        }

    } catch (error) {
        // 404: Not Found
        res.status(404).json({ message: error.message });
        console.log(error.message);
    }

    
    // try {
    //     const count = await PostSelection.find().count();
        
    //     // 200: OK
    //     res.status(200).json(count);
    //     console.log("GET COUNT DONE! : ", count); 
    // } catch (error) {
    //     // 404: Not Found
    //     res.status(404).json({ message: error.message });
    //     console.log(error.message);
    // }
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



        // if there is count cache, update the value (+1)
        try {
            const count = await redis_client.get('count');
            if (count != null) {
                await redis_client.set('count', parseInt(count) + 1);
                console.log("Update count in redis!", parseInt(count) + 1); 
            }
        } catch (error) {
            // 404: Not Found
            res.status(404).json({ message:  "Couldn't get the redis value when create the post. " + error.message });
            console.log(error.message);
        }
       
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