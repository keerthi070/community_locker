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
import React, { useEffect, useState } from 'react';
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

export default Dboard;
