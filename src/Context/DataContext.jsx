import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Initial Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', status: 'Active' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567', status: 'Inactive' }
    ]);

    const [owners, setOwners] = useState([
        { id: 1, businessName: 'City Parking', ownerName: 'Robert Brown', email: 'robert@cityparking.com', status: 'Active', lots: 3 },
        { id: 2, businessName: 'Metro Lots', ownerName: 'Sarah Wilson', email: 'sarah@metrolots.com', status: 'Pending', lots: 1 }
    ]);

    const [services, setServices] = useState([
        { id: 1, name: 'Standard Car Wash', description: 'Exterior wash and dry', price: 500, duration: '30m', active: true },
        { id: 2, name: 'Premium Detailing', description: 'Full interior and exterior detail', price: 2500, duration: '2h', active: true },
        { id: 3, name: 'Valet Parking', description: 'Professional valet service', price: 300, duration: 'N/A', active: true }
    ]);

    const [employees, setEmployees] = useState([
        { id: 1, name: 'Mike Johnson', role: 'Washer', email: 'mike@parkmate.com', phone: '555-111-2222', status: 'On Duty', serviceId: 1 },
        { id: 2, name: 'Emily Davis', role: 'Valet', email: 'emily@parkmate.com', phone: '555-333-4444', status: 'Off Duty', serviceId: 3 }
    ]);

    const [bookings, setBookings] = useState([
        { id: 1, userId: 1, userName: 'John Doe', lotName: 'City Parking - Lot A', date: '2023-10-25', status: 'Confirmed' },
        { id: 2, userId: 2, userName: 'Jane Smith', lotName: 'Metro Lots - Downtown', date: '2023-10-26', status: 'Pending' }
    ]);

    // --- User Actions ---
    const addUser = (user) => {
        const newUser = { ...user, id: Date.now(), status: 'Active' };
        setUsers([...users, newUser]);
    };

    const updateUser = (id, updatedUser) => {
        setUsers(users.map(user => user.id === id ? { ...user, ...updatedUser } : user));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // --- Owner Actions ---
    const addOwner = (owner) => {
        const newOwner = { ...owner, id: Date.now(), status: 'Active', lots: 0 };
        setOwners([...owners, newOwner]);
    };

    const updateOwner = (id, updatedOwner) => {
        setOwners(owners.map(owner => owner.id === id ? { ...owner, ...updatedOwner } : owner));
    };

    const deleteOwner = (id) => {
        setOwners(owners.filter(owner => owner.id !== id));
    };

    // --- Service Actions ---
    const addService = (service) => {
        const newService = { ...service, id: Date.now(), active: true };
        setServices([...services, newService]);
    };

    const updateService = (id, updatedService) => {
        setServices(services.map(service => service.id === id ? { ...service, ...updatedService } : service));
    };

    const deleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    };

    // --- Employee Actions ---
    const addEmployee = (employee) => {
        const newEmployee = { ...employee, id: Date.now(), status: 'Off Duty' };
        setEmployees([...employees, newEmployee]);
    };

    const updateEmployee = (id, updatedEmployee) => {
        setEmployees(employees.map(employee => employee.id === id ? { ...employee, ...updatedEmployee } : employee));
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(employee => employee.id !== id));
    };

    // --- Booking Actions ---
    const addBooking = (booking) => {
        const newBooking = { ...booking, id: Date.now(), status: 'Confirmed' };
        setBookings([...bookings, newBooking]);
    };

    const deleteBooking = (id) => {
        setBookings(bookings.filter(booking => booking.id !== id));
    };


    const value = {
        users, addUser, updateUser, deleteUser,
        owners, addOwner, updateOwner, deleteOwner,
        services, addService, updateService, deleteService,
        employees, addEmployee, updateEmployee, deleteEmployee,
        bookings, addBooking, deleteBooking
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
