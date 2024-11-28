import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss';

const ViewTask = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const [newTimeline, setNewTimeline] = useState({
    member_name: '',
    feedback: '',
    file: null, // Changed from time to file
  });
  const [taskData, setTaskData] = useState(task);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTimeline((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle file input changes (for image/video files)
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file) {
      setNewTimeline((prevState) => ({
        ...prevState,
        file: file
      }));
    }
  };

  // Handle adding a new timeline entry
  const handleAddTimeline = (e) => {
    e.preventDefault();
    if (newTimeline.member_name && newTimeline.feedback && newTimeline.file) {
      const updatedTimeline = [
        ...taskData.timeline,
        {
          member_name: newTimeline.member_name,
          feedback: newTimeline.feedback,
          file: newTimeline.file, // Store the file object
        }
      ];
      setTaskData((prevState) => ({
        ...prevState,
        timeline: updatedTimeline
      }));
      setNewTimeline({ member_name: '', feedback: '', file: null }); // Reset form
    }
  };

  return (
    <div className="container">
      <div className="task-layout">
        {/* Left Section: Attachments */}
        <div className="left-section">
          <h2 className="timeline-header">Attachments:</h2>
          <div className="attachments">
            {task?.attachments?.map((attachment, index) => (
              <div key={index} className="attachment-item">
                {attachment.type === 'image' && (
                  <div>
                    <img
                      src={attachment.url}
                      alt={attachment.description}
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                    />
                    <p>{attachment.description}</p>
                  </div>
                )}
                {attachment.type === 'video' && (
                  <div>
                    <video controls style={{ width: '100%' }}>
                      <source src={attachment.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p>{attachment.description}</p>
                  </div>
                )}
                {attachment.type === 'link' && (
                  <div>
                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                      {attachment.description}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Task Info and Timeline */}
        <div className="right-section">
          <h1 className="task-header">{task.title}</h1>
          <div className="task-info">
            <p><strong>Start Date:</strong> {task.StartDate}</p>
            <p><strong>End Date:</strong> {task.EndDate}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Assigned User:</strong> {task.AppUserId}</p>
            <p><strong>Department:</strong> {task.DepartmentId}</p>
          </div>

          <h2 className="timeline-header">Timeline:</h2>

          {/* Timeline Form */}
          <form className="timeline-form" onSubmit={handleAddTimeline}>
            <div className="form-group">
              <label htmlFor="member_name">Member Name:</label>
              <input
                type="text"
                id="member_name"
                name="member_name"
                value={newTimeline.member_name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                name="feedback"
                value={newTimeline.feedback}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">Upload File (Image/Video):</label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit">Add Timeline</button>
          </form>

          {/* Display Timeline */}
          <ul className="timeline-list">
            {taskData?.timeline?.map((entry, index) => (
              <li className="timeline-item" key={index}>
                <strong>{entry.member_name}:</strong> {entry.feedback}
                <div>
                  {/* Display the file if it's an image or video */}
                  {entry.file && entry.file.type.startsWith('image') && (
                    <img
                      src={URL.createObjectURL(entry.file)} // Display file locally before uploading
                      alt="Uploaded"
                      style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                    />
                  )}
                  {entry.file && entry.file.type.startsWith('video') && (
                    <video controls style={{ width: '100%' }}>
                      <source src={URL.createObjectURL(entry.file)} type={entry.file.type} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
