import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Animated,
} from 'react-native';

const AttendanceScreen = ({ navigation }) => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const scrollY = useRef(new Animated.Value(0)).current;
  const debounceTimeout = useRef(null);

  useEffect(() => {
    loadMockData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, startDate, endDate, attendanceList]);

  // 🔥 MOCK DATA
  const loadMockData = async () => {
    setLoading(true);

    setTimeout(() => {
      const data = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        studentName: `Student ${i}`,
        date: new Date().toISOString(),
        status: Math.random() > 0.5 ? 'Present' : 'Absent',
      }));

      setAttendanceList(data);
      setLoading(false);
    }, 1500);
  };

  // 🔥 Debounce Search
  const handleSearch = text => {
    setSearch(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      applyFilters();
    }, 500);
  };

  const applyFilters = () => {
    let data = [...attendanceList];

    // Search filter
    if (search.trim()) {
      data = data.filter(item =>
        item.studentName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Date range filter
    if (startDate && endDate) {
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredList(data);
  };

  // 🔥 Stats
  const totalPresent = filteredList.filter(i => i.status === 'Present').length;
  const totalAbsent = filteredList.filter(i => i.status === 'Absent').length;

  // 🔥 Animated Header
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [120, 70],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.studentName}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toDateString()}
        </Text>
      </View>
      <Text
        style={[
          styles.status,
          item.status === 'Present'
            ? styles.present
            : styles.absent,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  // 🔥 Shimmer Loader
  const renderShimmer = () => (
    <View style={styles.shimmerCard} />
  );

  return (
    <View style={styles.container}>

      {/* Animated Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={styles.title}>Attendance Dashboard</Text>

        {/* Search */}
        <TextInput
          placeholder="Search student..."
          style={styles.searchInput}
          onChangeText={handleSearch}
        />
      </Animated.View>

      {/* Summary Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalPresent}</Text>
          <Text style={styles.statLabel}>Present</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalAbsent}</Text>
          <Text style={styles.statLabel}>Absent</Text>
        </View>
      </View>

      {/* List */}
      {loading ? (
        <>
          {renderShimmer()}
          {renderShimmer()}
          {renderShimmer()}
        </>
      ) : filteredList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No attendance records found
          </Text>
        </View>
      ) : (
        <Animated.FlatList
          data={filteredList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadMockData}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        />
      )}

      {/* Floating Add */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddAttendance')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
};

export default AttendanceScreen;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },

  header: {
    backgroundColor: '#4A90E2',
    padding: 15,
    justifyContent: 'center',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  statNumber: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#777' },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { fontWeight: '600' },
  date: { fontSize: 12, color: '#777' },
  status: { fontWeight: 'bold' },
  present: { color: 'green' },
  absent: { color: 'red' },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: { color: '#777' },

  shimmerCard: {
    height: 80,
    backgroundColor: '#E0E0E0',
    margin: 10,
    borderRadius: 8,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4A90E2',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 28 },
});