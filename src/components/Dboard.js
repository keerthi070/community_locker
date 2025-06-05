
/*import React, { useEffect, useState } from 'react';
import './Dboard.css';

const Dboard = () => {
  const [boxCount, setBoxCount] = useState(0);
  const [lockersPerBox, setLockersPerBox] = useState(0);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parcelData, setParcelData] = useState({
    recipientName: '',
    phone: '',
    productId: '',
  });
  const [expandedBox, setExpandedBox] = useState(null);  // NEW

  const communityName = localStorage.getItem('communityName') || 'Default Hostel';
  const adminName = localStorage.getItem('adminName') || 'Default Watchman';

  useEffect(() => {
    const box = parseInt(localStorage.getItem('boxCount')) || 1;
    const lockers = parseInt(localStorage.getItem('lockersPerBox')) || 1;
    setBoxCount(box);
    setLockersPerBox(lockers);
  }, []);

  const handleLockerClick = (lockerId) => {
    setSelectedLocker(lockerId);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelData({ ...parcelData, [name]: value });
  };

  const handleAssign = () => {
    alert(`Parcel assigned to ${selectedLocker} for ${parcelData.recipientName}`);
    setShowModal(false);
    setParcelData({ recipientName: '', phone: '', productId: '' });
  };

  const toggleBox = (boxId) => {
    setExpandedBox(expandedBox === boxId ? null : boxId);
  };

  const renderBoxes = () => {
    const elements = [];
    for (let i = 0; i < boxCount; i++) {
      const boxId = `Box${i + 1}`;
      const isExpanded = expandedBox === boxId;

      elements.push(
        <div key={boxId} className="locker-box">
          <div
            className="box-title"
            onClick={() => toggleBox(boxId)}
          >
            {boxId}
          </div>

          {isExpanded && (
            <div className="box-lockers">
              {Array.from({ length: lockersPerBox }, (_, j) => (
                <div
                  key={`${boxId}-L${j + 1}`}
                  className="locker"
                  onClick={() => handleLockerClick(`${boxId}-L${j + 1}`)}
                >
                  L{j + 1}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return elements;
  };

  return (
    <div className="dashboard-container">
      <h2>Hello, {adminName}, Welcome to {communityName} community!</h2>
      <div className="lockers-grid">{renderBoxes()}</div>

      <div className="dashboard-buttons">
        <button>Retrieve Parcel</button>
        <button>View Parcel History</button>
        <button>Logout</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Assign New Parcel to Locker {selectedLocker}</h3>
            <label>Recipient Name:</label>
            <input name="recipientName" value={parcelData.recipientName} onChange={handleChange} />

            <label>Phone Number:</label>
            <input name="phone" value={parcelData.phone} onChange={handleChange} />

            <label>Product ID / Parcel Description:</label>
            <input name="productId" value={parcelData.productId} onChange={handleChange} />

            <button onClick={handleAssign}>Assign Parcel</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dboard;*/
/*import React, { useEffect, useState } from 'react';
import './Dboard.css';

const Dboard = () => {
  const [boxCount, setBoxCount] = useState(0);
  const [lockersPerBox, setLockersPerBox] = useState(0);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parcelData, setParcelData] = useState({
    recipientName: '',
    phone: '',
    productId: '',
  });
  const [currentBoxIndex, setCurrentBoxIndex] = useState(0);
  const [expandedBox, setExpandedBox] = useState(null);
  const [assignedLockers, setAssignedLockers] = useState({});

  const communityName = localStorage.getItem('communityName') || 'Default Hostel';
  const adminName = localStorage.getItem('adminName') || 'Default Watchman';

  useEffect(() => {
    const box = parseInt(localStorage.getItem('boxCount')) || 1;
    const lockers = parseInt(localStorage.getItem('lockersPerBox')) || 1;
    setBoxCount(box);
    setLockersPerBox(lockers);
  }, []);

  const handleLockerClick = (lockerId) => {
    setSelectedLocker(lockerId);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParcelData({ ...parcelData, [name]: value });
  };

  const handleAssign = () => {
    const { recipientName, phone, productId } = parcelData;

    if (!recipientName.trim() || !phone.trim() || !productId.trim()) {
      alert('Please fill in all fields before assigning the parcel.');
      return;
    }

    setAssignedLockers((prev) => ({
      ...prev,
      [selectedLocker]: true,
    }));

    alert(`Parcel assigned to ${selectedLocker} for ${parcelData.recipientName}`);
    setShowModal(false);
    setParcelData({ recipientName: '', phone: '', productId: '' });
  };

  const toggleBox = (boxId) => {
    setExpandedBox(expandedBox === boxId ? null : boxId);
  };

  const handlePrev = () => {
    setCurrentBoxIndex((prev) => (prev - 1 + boxCount) % boxCount);
  };

  const handleNext = () => {
    setCurrentBoxIndex((prev) => (prev + 1) % boxCount);
  };

  const renderCurrentBox = () => {
    const boxId = `Box${currentBoxIndex + 1}`;
    const isExpanded = expandedBox === boxId;

    return (
      <div className="locker-box slide-in">
        <div className="box-title" onClick={() => toggleBox(boxId)}>
          {boxId}
        </div>
        {isExpanded && (
          <div className="box-lockers">
            {Array.from({ length: lockersPerBox }, (_, j) => {
              const lockerId = `${boxId}-L${j + 1}`;
              const isAssigned = assignedLockers[lockerId];

              return (
                <div
                  key={lockerId}
                  className={`locker ${isAssigned ? 'assigned' : 'unassigned'}`}
                  onClick={() => handleLockerClick(lockerId)}
                >
                  L{j + 1}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h2>Hello, {adminName}, Welcome to {communityName} community!</h2>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-box unassigned"></div> Unassigned
        </div>
        <div className="legend-item">
          <div className="legend-box assigned"></div> Assigned
        </div>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrev}>{'< Prev'}</button>
        {renderCurrentBox()}
        <button onClick={handleNext}>{'Next >'}</button>
      </div>

      <div className="dashboard-buttons">
        <button>Retrieve Parcel</button>
        <button>View Parcel History</button>
        <button>Logout</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Assign New Parcel to Locker {selectedLocker}</h3>
            <label>Recipient Name:</label>
            <input name="recipientName" value={parcelData.recipientName} onChange={handleChange}/>

            <label>Phone Number:</label>
            <input name="phone" value={parcelData.phone} onChange={handleChange}/>

            <label>Product ID / Parcel Description:</label>
            <input name="productId" value={parcelData.productId} onChange={handleChange}/>

            <button onClick={handleAssign}>Assign Parcel</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dboard; */

// src/components/Dboard.jsx
/*import React, { useState } from 'react';
import './Dboard.css';

const Dboard = () => {
  const [selectedSystem, setSelectedSystem] = useState('Main Building');

  const systems = [
    { name: 'Main Building', location: 'Lobby' },
    { name: 'Residence Hall', location: 'First Floor' },
    { name: 'Gym', location: 'Entrance' }
  ];

  const lockers = Array.from({ length: 18 }, (_, i) => {
    const row = Math.floor(i / 6) + 1;
    const col = (i % 6) + 1;
    return {
      id: `0${row}-0${col}`,
      status: 'available'
    };
  });

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <div>Community Manager Dashboard</div>
        <div>Community ID: <strong>COM001</strong></div>
      </div>

      <div className="tabs">
        <div className="tab active">Locker Management</div>
        <div className="tab">Staff</div>
        <div className="tab">Residents <span className="badge">2</span></div>
        <div className="tab">Parcel History</div>
      </div>

      <div className="dashboard-content">
        <div className="left-panel">
          <h3>Locker Systems</h3>
          <p>Manage your locker systems for community COM001</p>
          {systems.map((system, index) => (
            <div
              key={index}
              className={`system-entry ${selectedSystem === system.name ? 'selected' : ''}`}
              onClick={() => setSelectedSystem(system.name)}
            >
              {system.name}<br />
              <small>{system.location}</small>
            </div>
          ))}
          <button className="add-button">+ Add System</button>
        </div>

        <div className="right-panel">
          <h2>{selectedSystem}</h2>
          <p>{systems.find(sys => sys.name === selectedSystem)?.location} - {selectedSystem} lockers</p>

          <div>
            <button className="add-button">+ Add Lockers</button>
            <button className="add-button" style={{ backgroundColor: '#ffdddd', color: 'red' }}>– Remove Lockers</button>
            <button className="add-button" style={{ float: 'right' }}>📦 Store Package</button>
          </div>

          <div className="status-legend">
            <div className="item"><span style={{ width: '12px', height: '12px', background: 'green', borderRadius: '50%' }}></span> Available</div>
            <div className="item"><span style={{ width: '12px', height: '12px', background: 'red', borderRadius: '50%' }}></span> Occupied</div>
          </div>

          <div className="locker-grid">
            {lockers.map((locker) => (
              <div className={`locker-tile ${locker.status}`} key={locker.id}>
                <span role="img" aria-label="lock">{locker.status === 'available' ? '🔓' : '🔒'}</span>
                <small>{locker.id}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dboard;*/
// src/components/Dboard.jsx
import React, { useState, useEffect } from 'react';
import './Dboard.css';

const Dboard = () => {
  const [selectedSystem, setSelectedSystem] = useState('Main Building');
  const [selectedTab, setSelectedTab] = useState('Locker Management');
  const [lockers, setLockers] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedLockerId, setSelectedLockerId] = useState(null);

  const communityName = localStorage.getItem('communityName') || 'COM001';

  const systems = [
    { name: 'Main Building', location: 'Lobby' },
  ];

  const numberOfLockerBoxes = parseInt(localStorage.getItem('numberOfLockerBoxes')) || 3;
  const lockersInEachBox = parseInt(localStorage.getItem('lockersInEachBox')) || 6;

  useEffect(() => {
    const generatedLockers = [];
    for (let box = 1; box <= numberOfLockerBoxes; box++) {
      for (let lockerNum = 1; lockerNum <= lockersInEachBox; lockerNum++) {
        generatedLockers.push({
          id: `B${box}-L${lockerNum}`,
          status: 'available',
        });
      }
    }
    setLockers(generatedLockers);
  }, [numberOfLockerBoxes, lockersInEachBox]);

  const renderLockerManagement = () => {
    return React.createElement(
      React.Fragment,
      {},
      React.createElement(
        'div',
        { className: 'left-panel' },
        [
          React.createElement('h3', { key: 'heading' }, 'Locker Systems'),
          React.createElement('p', { key: 'desc' }, `Manage your locker systems for community ${communityName}`),
          ...systems.map((system, index) =>
            React.createElement(
              'div',
              {
                key: `system-${index}`,
                className: `system-entry ${selectedSystem === system.name ? 'selected' : ''}`,
                onClick: () => setSelectedSystem(system.name)
              },
              [system.name, React.createElement('br', { key: 'br' }), React.createElement('small', { key: 'small' }, system.location)]
            )
          ),
          React.createElement('button', { className: 'add-button', key: 'add-sys' }, '+ Add System')
        ]
      ),
      React.createElement(
        'div',
        { className: 'right-panel' },
        [
          React.createElement('h2', { key: 'sys' }, selectedSystem),
          React.createElement('p', { key: 'loc' },
            `${systems.find(sys => sys.name === selectedSystem)?.location} - ${selectedSystem} lockers`
          ),
          React.createElement(
            'div',
            { key: 'toolbar' },
            [
              React.createElement('button', { className: 'add-button', key: 'add-lock' }, '+ Add Lockers'),
              React.createElement('button', {
                className: 'add-button',
                key: 'remove-lock',
                style: { backgroundColor: '#ffdddd', color: 'red' }
              }, '– Remove Lockers'),
              React.createElement('button', {
                className: 'add-button',
                key: 'store-package',
                style: { float: 'right' }
              }, '📦 Store Package')
            ]
          ),
          React.createElement(
            'div',
            { className: 'status-legend', key: 'legend' },
            [
              React.createElement('div', { className: 'item', key: 'available' },
                React.createElement('span', {
                  style: { width: '12px', height: '12px', background: 'green', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }
                }), ' Available'
              ),
              React.createElement('div', { className: 'item', key: 'occupied' },
                React.createElement('span', {
                  style: { width: '12px', height: '12px', background: 'red', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }
                }), ' Occupied'
              )
            ]
          ),
          React.createElement(
            'div',
            { className: 'locker-grid', key: 'locker-grid' },
            lockers.map((locker) =>
              React.createElement(
                'div',
                {
                  key: locker.id,
                  className: `locker-tile ${locker.status}`,
                  onClick: () => {
                    setSelectedLockerId(locker.id);
                    setShowAssignModal(true);
                  }
                },
                [
                  React.createElement('span', {
                    key: 'icon',
                    role: 'img',
                    'aria-label': 'lock'
                  }, locker.status === 'available' ? '🔓' : '🔒'),
                  React.createElement('small', { key: 'id' }, locker.id)
                ]
              )
            )
          )
        ]
      )
    );
  };

  const renderContent = () => {
    if (selectedTab === 'Locker Management') {
      return renderLockerManagement();
    } else if (selectedTab === 'Staff') {
      return React.createElement('div', {}, [
        React.createElement('h2', { key: 'staff-title' }, 'Staff Management Page'),
        React.createElement('p', { key: 'staff-desc' }, 'Staff details and management here.')
      ]);
    } else if (selectedTab === 'Parcel History') {
      return React.createElement('div', {}, [
        React.createElement('h2', { key: 'ph-title' }, 'Parcel History Page'),
        React.createElement('p', { key: 'ph-desc' }, 'Parcel history and records here.')
      ]);
    }
  };

  const modal = showAssignModal && React.createElement(
    'div',
    { className: 'modal-overlay' },
    React.createElement(
      'div',
      { className: 'modal-content' },
      [
        React.createElement(
          'h3',
          { key: 'modal-title' },
          ['Assign New Parcel to Locker', React.createElement('br', { key: 'br1' }), React.createElement('strong', { key: 'strong' }, selectedLockerId)]
        ),
        React.createElement('label', { key: 'label1' }, 'Recipient Name:'),
        React.createElement('input', {
          key: 'input1',
          type: 'text',
          placeholder: 'Enter recipient name'
        }),
        React.createElement('label', { key: 'label2' }, 'Phone Number:'),
        React.createElement('input', {
          key: 'input2',
          type: 'text',
          placeholder: 'Enter phone number'
        }),
        React.createElement('label', { key: 'label3' }, 'Product ID / Parcel Description:'),
        React.createElement('input', {
          key: 'input3',
          type: 'text',
          placeholder: 'Enter product ID or description'
        }),
        React.createElement(
          'div',
          { key: 'buttons', className: 'modal-buttons' },
          [
            React.createElement(
              'button',
              {
                key: 'assign',
                onClick: () => setShowAssignModal(false)
              },
              'Assign Parcel'
            ),
            React.createElement(
              'button',
              {
                key: 'cancel',
                onClick: () => setShowAssignModal(false)
              },
              'Cancel'
            )
          ]
        )
      ]
    )
  );

  return React.createElement(
    'div',
    { className: 'dashboard-container' },
    [
      React.createElement(
        'div',
        { className: 'top-bar', key: 'top' },
        [
          React.createElement('div', { key: 'top1' }, 'Community Manager Dashboard'),
          React.createElement('div', { key: 'top2' },
            ['Community Name: ', React.createElement('strong', { key: 'name' }, communityName)]
          )
        ]
      ),
      React.createElement(
        'div',
        { className: 'tabs', key: 'tabs' },
        ['Locker Management', 'Staff', 'Parcel History'].map((tab) =>
          React.createElement(
            'div',
            {
              key: tab,
              className: `tab ${selectedTab === tab ? 'active' : ''}`,
              onClick: () => setSelectedTab(tab),
              style: { cursor: 'pointer' }
            },
            tab
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'dashboard-content', key: 'content' },
        [renderContent(), modal]
      )
    ]
  );
};

export default Dboard;
