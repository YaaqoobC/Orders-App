import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';

import { COMPANIES_DATA } from '@/constants/Companies';
import { Colors } from '@/constants/Colors';

import EditCompanyModal from '@/components/EditCompanyModal';

const CompanyPage = () => {
    const [companies, setCompanies] = useState(COMPANIES_DATA);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const renderCompanyCard = ({ item }) => (
        <TouchableOpacity onPress={() => handleSwipeLeft(item)}>
            <View style={styles.card}>
                <Image source={item.thumbnail} style={styles.thumbnail} />
                <View style={styles.companyDetails}>
                    <Text style={styles.companyName}>{item.name}</Text>
                    <Text style={styles.companyInfo}>{item.address}</Text>
                    <Text style={styles.companyInfo}>{item.phone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const addCompany = () => {
        const newCompany = {
            id: Math.random().toString(),
            name: `Company ${String.fromCharCode(65 + companies.length)}`,
            address: `Address ${companies.length + 1}`,
            phone: `1234567890`,
        };
        setCompanies([...companies, newCompany]);
    };

    const handleSwipeLeft = (company) => {
        setSelectedCompany(company); // Set the selected company to edit
        setModalVisible(true); // Show the modal
    };

    const handleSaveCompany = (updatedCompany) => {
        const updatedCompanies = companies.map(company =>
            company.id === updatedCompany.id ? updatedCompany : company
        );
        setCompanies(updatedCompanies);
        setModalVisible(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.pageTitle}>Manage Your Companies</Text>
                <FlatList
                    data={companies}
                    renderItem={renderCompanyCard}
                />
                <EditCompanyModal
                    isVisible={isModalVisible}
                    company={selectedCompany}
                    onSave={handleSaveCompany}
                    onClose={handleCloseModal}
                />
                <TouchableOpacity style={styles.addButton} onPress={addCompany}>
                    <Text style={styles.addButtonText}>+ Add Company</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        paddingBottom: 225, // Added space for the button at the bottom
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 15,
        marginVertical: 12,
        elevation: 5, // Adds shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginHorizontal: 10, // Adds some space from the edges
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },
    companyDetails: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1, // Ensures text doesn't get squished
    },
    companyName: {
        fontSize: 22,
        fontWeight: '600',
        color: 'white',
        marginBottom: 5, // Space between the name and address
    },
    companyInfo: {
        fontSize: 14,
        color: '#ccc',
        marginBottom: 4, // Added space between address/phone
    },
    addButton: {
        backgroundColor: Colors.accentColor.color,
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
        elevation: 3, // Adds shadow effect
    },
    addButtonText: {
        color: Colors.accentColor.textColor,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CompanyPage;
