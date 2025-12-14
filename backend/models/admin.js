const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  adminId: {
    type: String,
    unique: true,
    required: true
  },
  permissions: [{
    type: String,
    enum: [
      'manage_users',
      'manage_appointments',
      'view_analytics',
      'manage_system_settings',
      'send_notifications',
      'manage_content'
    ]
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);
