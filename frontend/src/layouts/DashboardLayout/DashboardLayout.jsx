import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import projectService from '../../services/project.service';

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await projectService.createProject(title, description);
      if (data && data.success) {
        setIsModalOpen(false);
        setTitle('');
        setDescription('');
        // Navigate to the newly created project page
        navigate(`/project/${data.project._id}`);
      } else {
        setError(data.message || 'Failed to create project.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred while creating project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md overflow-hidden flex h-screen w-screen relative dashboard-bg">
      {/* Dynamic Sidebar */}
      <Sidebar 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
        onOpenNewProjectModal={() => setIsModalOpen(true)}
      />

      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Pass mobile toggle trigger context to layout children */}
        <Outlet context={{ toggleMobileSidebar: () => setMobileOpen(!mobileOpen) }} />
      </main>

      {/* Global New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="glass-panel w-full max-w-md rounded-xl p-8 shadow-2xl relative z-10 overflow-hidden">
            {/* Glowing effect inside modal */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 text-2xl">Create Project</h2>
              <p className="font-body-md text-sm text-on-surface-variant mb-6">Initialize a new workspace board for your team.</p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-xs font-label-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block" htmlFor="proj-title">Project Title</label>
                  <input 
                    type="text" 
                    id="proj-title"
                    className="input-glass w-full px-4 py-2.5 rounded-lg text-on-surface focus:ring-0" 
                    placeholder="e.g. Website Redesign Q3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface block" htmlFor="proj-desc">Description</label>
                  <textarea 
                    id="proj-desc"
                    className="input-glass w-full px-4 py-2.5 rounded-lg text-on-surface focus:ring-0 resize-none h-24" 
                    placeholder="Incorporate legacy features and migrate layout..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg font-label-md text-sm border border-outline-variant text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg btn-primary font-label-md text-sm font-semibold flex items-center gap-1.5"
                  >
                    {loading ? 'Creating...' : 'Create'}
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
