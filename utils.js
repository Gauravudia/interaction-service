const axios = require('axios');

exports.checkIfUserExist = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:${process.env.USER_SERVICE_PORT}/users/${userId}`);
        return !!response?.data?.id;
    } catch (error) {
        console.error('Error fetching user:', error);
        return false;
    }
};

exports.checkIfDiscussionExist = async (discussionId) => {
    try {
        const response = await axios.get(`http://localhost:${process.env.DISCUSSION_SERVICE_PORT}/discussions/${discussionId}`);
        return !!response?.data?.id;
    } catch (error) {
        console.error('Error fetching discussion:', error);
        return false;
    }
};