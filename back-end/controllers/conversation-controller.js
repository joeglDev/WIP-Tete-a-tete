const { insertNewUserConversation } = require("../models/conversations-model");

exports.postNewConversation = async (req, res) => {
    const {user_id} = req.params;
    const { new_conversation } = req.body;
    
    try {
        //model response is missing topics key : [] value
        const newConversation = await insertNewUserConversation(user_id, new_conversation);
        newConversation["topics"] = new_conversation.topics;
const responseBody = {"new_conversation" : newConversation};
console.log(responseBody)
res.status(201).send(responseBody);
    } catch (error) {
        console.log(error)
    }
    
};
