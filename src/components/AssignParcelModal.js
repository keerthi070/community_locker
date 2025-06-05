showAssignModal && React.createElement(
  'div',
  { className: 'modal-overlay' },
  React.createElement(
    'div',
    { className: 'modal-content' },
    [
      React.createElement(
        'h3',
        { key: 'title' },
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
)
