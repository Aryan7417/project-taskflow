import React, { useState, useEffect } from 'react';
import taskService from '../../services/task.service';

const TaskModal = ({ isOpen, onClose, task, projectId, projectMembers, onTaskUpdated, isCreation, initialStatus }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  // Custom comments system parsed from description
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isCreation) {
      setTitle('');
      setDescription('');
      setStatus(initialStatus || 'Todo');
      setPriority('Medium');
      setAssignedTo('');
      setDueDate('');
      setComments([]);
      setError('');
    } else if (task) {
      // Parse description and comments
      const parts = (task.description || '').split('<!-- COMMENTS_JSON -->');
      const descText = parts[0] || '';
      let commentsList = [];
      if (parts[1]) {
        try {
          commentsList = JSON.parse(parts[1]);
        } catch (e) {
          commentsList = [];
        }
      }
      
      setTitle(task.title || '');
      setDescription(descText);
      setStatus(task.status || 'Todo');
      setPriority(task.priority || 'Medium');
      setAssignedTo(task.assignedTo?._id || task.assignedTo || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setComments(commentsList);
      setError('');
    }
  }, [task, isCreation, isOpen, initialStatus]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Serialize comments into description
      const serializedDescription = `${description}<!-- COMMENTS_JSON -->${JSON.stringify(comments)}`;

      const payload = {
        title,
        description: serializedDescription,
        status,
        priority,
        assignedTo: assignedTo || null,
        dueDate: dueDate || null
      };

      if (isCreation) {
        payload.project = projectId;
        const res = await taskService.createTask(payload);
        if (res && res.success) {
          onTaskUpdated();
          onClose();
        } else {
          setError(res.message || 'Failed to create task');
        }
      } else {
        const res = await taskService.updateTask(task._id, payload);
        if (res && res.success) {
          onTaskUpdated();
          onClose();
        } else {
          setError(res.message || 'Failed to update task');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        const res = await taskService.deleteTask(task._id);
        if (res && res.success) {
          onTaskUpdated();
          onClose();
        } else {
          setError(res.message || 'Failed to delete task');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: 'You', // In a real system, we'd use current user's name
      text: newComment.trim(),
      date: new Date().toLocaleString()
    };

    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    setNewComment('');

    // If updating existing task, auto-save comments to description immediately
    if (!isCreation && task) {
      const serializedDescription = `${description}<!-- COMMENTS_JSON -->${JSON.stringify(updatedComments)}`;
      taskService.updateTask(task._id, { description: serializedDescription })
        .then(res => {
          if (res.success) {
            onTaskUpdated();
          }
        })
        .catch(err => console.error('Failed to auto-save comment:', err));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
      
      {/* Modal Container */}
      <div 
        role="dialog" 
        className="glass-panel w-full max-w-5xl rounded-xl z-50 flex flex-col max-h-[90vh] overflow-hidden shadow-2xl emerald-glow text-on-background relative bg-[#171d18]"
      >
        {/* Modal Header */}
        <header className="flex justify-between items-start p-6 border-b border-outline-variant bg-surface-container/50">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-primary-container/10 border border-primary/20 text-primary font-label-md text-label-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {status}
              </span>
              <span className="text-on-surface-variant font-label-md text-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">folder</span>
                Engineering
              </span>
              {!isCreation && task && (
                <span className="text-on-surface-variant font-label-md text-label-md">TASK-{task._id.slice(-6).toUpperCase()}</span>
              )}
            </div>
            {isCreation ? (
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 text-2xl font-bold">New Task</h2>
            ) : (
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1 text-2xl font-bold">{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isCreation && (
              <button 
                onClick={handleDelete}
                title="Delete Task"
                className="p-2 rounded-lg text-error hover:text-white hover:bg-error-container transition-colors ghost-border border-error/30"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            )}
            <button onClick={onClose} aria-label="Close modal" className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors ghost-border">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </header>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          
          {/* Main Content Area */}
          <form onSubmit={handleSave} className="flex-1 p-6 lg:p-8 flex flex-col gap-6 lg:border-r border-outline-variant">
            
            {error && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container text-xs font-label-md">
                {error}
              </div>
            )}

            {/* Task Title Form Field (Creation mode or editable inline) */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block" htmlFor="task-title-input">Task Title</label>
              <input 
                id="task-title-input"
                type="text" 
                className="input-glass w-full px-4 py-2.5 rounded-lg text-on-surface focus:ring-0 text-base"
                placeholder="e.g. Implement WebGL canvas component"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-2" htmlFor="task-desc-input">
                <span className="material-symbols-outlined text-[18px]">description</span>
                Description
              </label>
              <textarea 
                id="task-desc-input"
                className="input-glass w-full px-4 py-2.5 rounded-lg text-on-surface focus:ring-0 resize-none h-32 text-sm leading-relaxed"
                placeholder="Enter detailed description of requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 rounded-lg font-label-md text-sm border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="px-5 py-2 rounded-lg btn-primary font-label-md text-sm font-semibold flex items-center gap-1.5"
              >
                {loading ? 'Saving...' : 'Save Changes'}
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
            </div>

            <hr className="border-outline-variant" />

            {/* Comments Activity Section (Only if task exists) */}
            {!isCreation && (
              <section className="space-y-4">
                <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  Activity & Comments
                </h2>
                
                {/* Comment Input */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-outline-variant bg-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
                  </div>
                  <div className="flex-1 relative">
                    <textarea 
                      className="w-full bg-[#0e1a10] border border-outline-variant rounded-lg p-3 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none h-24 placeholder-on-surface-variant/50" 
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="absolute bottom-2 right-2">
                      <button 
                        type="button"
                        onClick={handleAddComment}
                        className="px-3 py-1.5 bg-primary-container text-black font-label-md text-label-md rounded hover:bg-primary transition-colors text-xs font-semibold"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-outline-variant/60 pt-2">
                  {comments.length === 0 ? (
                    <p className="text-xs text-on-surface-variant/40 italic pl-12">No comments posted yet.</p>
                  ) : (
                    comments.map((c) => (
                      <div key={c.id} className="flex gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-[20px]">person</span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-surface-container rounded-lg border border-outline-variant p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label-md text-label-md text-on-surface font-bold text-sm">{c.author}</span>
                              <span className="font-code-sm text-code-sm text-on-surface-variant text-[11px]">{c.date}</span>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface text-sm">{c.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}
          </form>

          {/* Sidebar (Metadata editing panel) */}
          <aside className="w-full lg:w-80 p-6 lg:p-8 bg-[#0a100b]/40 flex flex-col gap-6 select-none shrink-0 border-t lg:border-t-0 border-outline-variant">
            
            {/* Assignee */}
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3 text-xs">Assignee</h3>
              <div className="space-y-2">
                <select
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  className="w-full bg-[#0e1a10] border border-[#3c4a42] text-on-surface font-body-md text-sm rounded-lg p-2.5 focus:border-primary focus:ring-0"
                >
                  <option value="">Unassigned</option>
                  {projectMembers?.map((m) => (
                    <option key={m._id} value={m._id}>{m.name} ({m.email})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Properties */}
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3 text-xs">Properties</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">Priority</span>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className={`bg-[#0e1a10] border border-[#3c4a42] font-body-md text-sm rounded-lg p-2 focus:border-primary focus:ring-0 ${
                      priority === 'High' ? 'text-error' : priority === 'Medium' ? 'text-secondary' : 'text-on-surface-variant'
                    }`}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">Status</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-[#0e1a10] border border-[#3c4a42] text-primary font-body-md text-sm rounded-lg p-2 focus:border-primary focus:ring-0"
                  >
                    <option value="Todo">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-code-sm text-code-sm text-on-surface-variant">Due Date</span>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-[#0e1a10] border border-[#3c4a42] text-on-surface font-body-md text-sm rounded-lg p-2 focus:border-primary focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Labels aesthetic */}
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3 text-xs">Labels</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#00422b] text-[#87d2b2] font-code-sm text-code-sm border border-[#005c43]">engineering</span>
                <span className="px-2.5 py-1 rounded-md bg-[#2c322c] text-on-surface font-code-sm text-code-sm border border-outline-variant">taskflow</span>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
