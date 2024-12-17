import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase'; // Importing Firestore instance
import AdminTopLayer from '../components/AdminTopLayer';
import { FaTasks, FaPlusSquare } from 'react-icons/fa';
import AdminTaskCard from '../components/AdminTaskCard';
import { NavLink } from 'react-router-dom';

const AdminTask = () => {
  const [tasks, setTasks] = useState({
    'All Tasks': [],
    'Ongoing Tasks': [],
    'Completed Tasks': [],
    'Pending Tasks': [],
    'Under Review': [],
  });
  const mapTabToStatus = (tab) => {
    switch (tab) {
      case 'Ongoing Tasks':
        return 'ongoing';
      case 'Completed Tasks':
        return 'completed';
      case 'Pending Tasks':
        return 'pending';
      case 'Under Review':
        return 'under-review';
      default:
        return null; // For "All Tasks", no specific status
    }
  };

  const [activeTab, setActiveTab] = useState('All Tasks');
  const [lastDoc, setLastDoc] = useState(null); // For pagination
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Check if more tasks are available
  const [searchQuery, setSearchQuery] = useState(''); // Search input

  const fetchTasks = async (tab, isLoadMore = false) => {
    setLoading(true);
    try {
      const tasksCollection = collection(db, 'tasks');
      let tasksQuery;

      if (tab === 'All Tasks') {
        tasksQuery = query(
          tasksCollection,
          orderBy('createdAt', 'desc'),
          ...(isLoadMore && lastDoc ? [startAfter(lastDoc)] : []),
          limit(10)
        );
      } else {
        const status = mapTabToStatus(tab);
        if (status) {
          tasksQuery = query(
            tasksCollection,
            where('status', '==', status),
            orderBy('createdAt', 'desc'),
            ...(isLoadMore && lastDoc ? [startAfter(lastDoc)] : []),
            limit(10)
          );
        }
      }

      const querySnapshot = await getDocs(tasksQuery);
      const fetchedTasks = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.name,
          date: formatRelativeDate(data.createdAt),
          status: data.status,
          price: data.price,
          dueDate: formatDate(data.dueDate),
          description: data.overview,
          tags: [data.category],
          maxSubmission: data.maxSubmission,
        };
      });

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null); // Save the last document for pagination

      setTasks((prevTasks) => ({
        ...prevTasks,
        [tab]: isLoadMore ? [...prevTasks[tab], ...fetchedTasks] : fetchedTasks,
      }));

      setHasMore(fetchedTasks.length === 10); // If less than 10 tasks are fetched, no more tasks are available
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const loadMoreTasks = () => {
    if (!loading && hasMore && activeTab === 'All Tasks') {
      fetchTasks(activeTab, true);
    }
  };

  const formatRelativeDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate();
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return `${diffInDays} days ago`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No due date';
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  const filteredTasks = tasks[activeTab]?.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'DMM, sans-serif',
      }}
    >
      {/* AdminTopLayer remains fixed */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#fff',
        }}
      >
        <AdminTopLayer name="Tasks" icon={FaTasks} />
      </div>

      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          {/* <button
            style={{
              backgroundColor: '#2f2f2f',
              color: '#FFF',
              padding: '10px 10px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontFamily: 'DMM',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <NavLink
              to={`create-task`}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Create a New Task <FaPlusSquare style={{ marginLeft: '8px' }} />
            </NavLink>
          </button> */}
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              fontFamily: 'DMM',width:'80%',
            }}
          />
        </div>

        <div
          className="tabs"
          style={{
            display: 'flex',
            borderBottom: '2px solid #ddd',
            marginBottom: '10px',
          }}
        >
          {Object.keys(tasks).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: '#f7f9fb',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                color: activeTab === tab ? '#000' : '#858585',
                borderBottom: activeTab === tab ? '2px solid #ff4081' : 'none',
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div
          style={{
            flex: '1',
            overflowY: 'auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px'
          }}
          onScroll={(e) => {
            if (
              e.target.scrollTop + e.target.clientHeight >=
              e.target.scrollHeight - 10
            ) {
              loadMoreTasks(); // Trigger loading more tasks
            }
          }}
        >
          {filteredTasks?.length > 0 ? (
            filteredTasks.map((task) => (
              <AdminTaskCard key={task.id} {...task} />
            ))
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: '#858585',
                fontSize: '1.5rem',
                padding: '20px',
                fontFamily: 'DMB',
              }}
            >
              No{' '}
              <span
                style={{ color: '#cf1270', fontFamily: 'DMB' }}
              >
                {activeTab}
              </span>{' '}
              tasks available
            </div>
          )}
          {loading && (
            <div
              style={{
                textAlign: 'center',
                color: '#858585',
                fontSize: '1rem',
                padding: '10px',
                fontFamily: 'DMB',
              }}
            >
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTask;
