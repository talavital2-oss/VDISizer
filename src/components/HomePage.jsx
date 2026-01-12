import React, { useState, useEffect } from 'react';

const Icons = {
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Folder: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Server: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
};

const HomePage = ({ onOpenProject, projects, onCreateProject, onDeleteProject, theme, onToggleTheme }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const isDark = theme === 'dark';

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      onCreateProject({
        name: newProjectName.trim(),
        description: newProjectDescription.trim(),
      });
      setNewProjectName('');
      setNewProjectDescription('');
      setShowCreateModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`border-b ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">T</span>
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>VDI Architect</h1>
                <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-sm mt-1`}>Professional Infrastructure Sizing Tool</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onToggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? 'hover:bg-slate-800 text-slate-400 hover:text-orange-500'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-orange-500'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Icons.Sun /> : <Icons.Moon />}
              </button>
              <div className="flex items-center gap-2">
                <span className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Powered by</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">TERASKY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Create New Project Card */}
        <div className="mb-12">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-8 transition-all shadow-lg hover:shadow-xl border border-orange-400/20"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Icons.Plus />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Create New Sizing Project</div>
                <div className="text-orange-100 text-sm mt-1">Start a new VDI infrastructure calculation</div>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
              <Icons.Clock />
              Recent Projects
            </h2>
            <span className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-sm`}>{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
          </div>

          {projects.length === 0 ? (
            <div className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border rounded-xl p-12 text-center`}>
              <div className={`w-20 h-20 ${isDark ? 'bg-slate-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icons.Folder />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'} mb-2`}>No Projects Yet</h3>
              <p className={isDark ? 'text-slate-500' : 'text-gray-500'}>Create your first project to get started with VDI sizing</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border rounded-xl p-6 hover:border-orange-500/50 transition-all group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <Icons.Server />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onOpenProject(project)}
                        className={`p-2 ${isDark ? 'text-slate-400' : 'text-gray-600'} hover:text-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors`}
                        title="Open Project"
                      >
                        <Icons.Edit />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className={`p-2 ${isDark ? 'text-slate-400' : 'text-gray-600'} hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors`}
                        title="Delete Project"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 group-hover:text-orange-400 transition-colors`}>
                    {project.name}
                  </h3>

                  {project.description && (
                    <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>{project.description}</p>
                  )}

                  <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-500 border-slate-800' : 'text-gray-500 border-gray-200'} mt-4 pt-4 border-t`}>
                    <span>Modified {formatDate(project.lastModified)}</span>
                    {project.data && (
                      <span className="text-orange-500 font-medium">
                        {project.data.numUsers || 0} Users
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenProject(project)}
                    className="w-full mt-4 bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Open Project
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-300'} border rounded-2xl p-8 max-w-lg w-full shadow-2xl`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Create New Project</h2>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                  Project Name *
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g., Q1 2024 VDI Expansion"
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                  autoFocus
                />
              </div>

              <div>
                <label className={`block text-sm font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                  Description (Optional)
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Brief description of your sizing project..."
                  rows="3"
                  className={`w-full ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                  } border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewProjectName('');
                  setNewProjectDescription('');
                }}
                className={`flex-1 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } font-bold py-3 px-6 rounded-lg transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className={`flex-1 ${
                  newProjectName.trim()
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                    : isDark
                    ? 'bg-slate-700 text-slate-500'
                    : 'bg-gray-300 text-gray-500'
                } disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg`}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
