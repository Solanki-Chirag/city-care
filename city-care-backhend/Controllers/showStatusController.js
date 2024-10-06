const Complaint = require('../Model/Complaint'); // Import the Complaint model
const AcceptedComplaints = require('../Model/Accepted_Complaints'); // Import the Accepted_Complaints model

const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options); // Format date to dd-mm-yyyy
};

const showStatus = async (req, res) => {
    try {
        const email = req.params.email;

        // Fetch user complaints from the Complaint model
        const userComplaints = await Complaint.find({ email: email }, 'time area status').lean();

        // Fetch accepted complaints from the Accepted_Complaints model
        const acceptedComplaints = await AcceptedComplaints.find({ email: email }, 'time area department status').lean();

        // Extract IDs of accepted complaints for filtering
        const acceptedIds = acceptedComplaints.map(complaint => complaint._id.toString());

        // Filter user complaints to exclude those that are already accepted
        const filteredUserComplaints = userComplaints.filter(complaint => !acceptedIds.includes(complaint._id.toString()));

        // Combine both arrays (only accepted complaints and filtered user complaints)
        const allComplaints = [...acceptedComplaints, ...filteredUserComplaints];

        // Sort all complaints by time in descending order
        allComplaints.sort((a, b) => new Date(b.time) - new Date(a.time));

        // Format the time in dd-mm-yyyy format
        const formattedComplaints = allComplaints.map(complaint => ({
            ...complaint,
            time: formatDate(complaint.time), // Format the time
        }));

        res.status(200).json(formattedComplaints);
    } catch (error) {
        console.error('Error fetching user complaints:', error);
        res.status(500).send({ message: 'Error fetching complaints' });
    }
};

module.exports = { showStatus };
