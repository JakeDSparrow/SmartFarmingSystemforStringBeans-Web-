import React, { useState } from 'react';
import { User, Plus, Search, Trash2, Edit, Mail, Calendar } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  isActive: boolean;
  lastActive: string;
  createdAt: string;
  selected: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      email: 'john.doe@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'ADMIN',
      isActive: true,
      lastActive: 'September 10, 2025',
      createdAt: 'August 1, 2025',
      selected: true
    },
    {
      id: '2',
      email: 'jane.smith@gmail.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'USER',
      isActive: true,
      lastActive: 'September 10, 2025',
      createdAt: 'August 1, 2025',
      selected: false
    },
    {
      id: '3',
      email: 'bob.johnson@gmail.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      role: 'USER',
      isActive: true,
      lastActive: 'September 10, 2025',
      createdAt: 'August 1, 2025',
      selected: false
    },
    {
      id: '4',
      email: 'alice.williams@gmail.com',
      firstName: 'Alice',
      lastName: 'Williams',
      role: 'VIEWER',
      isActive: false,
      lastActive: 'September 8, 2025',
      createdAt: 'August 1, 2025',
      selected: false
    },
    {
      id: '5',
      email: 'charlie.brown@gmail.com',
      firstName: 'Charlie',
      lastName: 'Brown',
      role: 'USER',
      isActive: true,
      lastActive: 'September 10, 2025',
      createdAt: 'August 1, 2025',
      selected: false
    },
    {
      id: '6',
      email: 'emma.davis@gmail.com',
      firstName: 'Emma',
      lastName: 'Davis',
      role: 'USER',
      isActive: true,
      lastActive: 'September 9, 2025',
      createdAt: 'August 1, 2025',
      selected: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const toggleUserSelection = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, selected: !user.selected } : user
    ));
  };

  const toggleAllUsers = () => {
    const allSelected = users.every(user => user.selected);
    setUsers(users.map(user => ({ ...user, selected: !allSelected })));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'USER':
        return 'bg-blue-100 text-blue-800';
      case 'VIEWER':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 text-sm mt-1">Manage user accounts and permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* User Cards - Horizontal Scroll */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} className="flex flex-col items-center gap-2 min-w-max">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <User size={32} className="text-white" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Account {num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Filters
          </button>
        </div>

        {/* Table Header */}
        <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg flex items-center">
          <div className="w-12">
            <input
              type="checkbox"
              checked={users.every(user => user.selected)}
              onChange={toggleAllUsers}
              className="w-4 h-4 cursor-pointer"
              title="Select all users"
              aria-label="Select all users"
            />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-medium text-sm">User Information</span>
            </div>
            <div className="flex gap-32">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="font-medium text-sm">Last Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="font-medium text-sm">Date Added</span>
              </div>
              <span className="font-medium text-sm">Actions</span>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="divide-y">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center px-4 py-4 hover:bg-gray-50 transition-colors ${
                !user.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="w-12">
                <input
                  type="checkbox"
                  checked={user.selected}
                  onChange={() => toggleUserSelection(user.id)}
                  className="w-4 h-4 cursor-pointer"
                  title="Select user"
                  aria-label="Select user"
                />
              </div>
              
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                      {!user.isActive && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-32">
                  <span className="text-sm text-gray-600">{user.lastActive}</span>
                  <span className="text-sm text-gray-600">{user.createdAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-gray-600">
          <span>{users.filter(u => u.selected).length} of {users.length} users selected</span>
          <span>{users.filter(u => u.isActive).length} active users</span>
        </div>
      </div>
    </div>
  );
};

export default Users;