import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

const EditCompanyModal = ({ isVisible, company, onSave, onClose }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    // Update state when a new company is selected
    useEffect(() => {
        if (company) {
            setName(company.name || '');
            setAddress(company.address || '');
            setPhone(company.phone || '');
        }
    }, [company]); // Runs every time `company` changes

    const handleSave = () => {
        if (!company) return; // Prevent saving if company is null

        const updatedCompany = { ...company, name, address, phone };
        onSave(updatedCompany);
    };

    if (!isVisible || !company) return null; // Don't render if modal is not visible or no company is selected

    return (
        <Modal
            transparent
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.header}>Edit Company</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Company Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter company name"
                            placeholderTextColor="#888"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Enter address"
                            placeholderTextColor="#888"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter phone number"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)', // Darker overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#1e1e1e', // Dark theme background
        padding: 20,
        borderRadius: 10,
        alignItems: 'stretch',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: 'white',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderColor: '#333',
        backgroundColor: '#2a2a2a', // Slightly lighter for contrast
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        color: 'white',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: Colors.accentColor.color,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: '#ff3b30',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.accentColor.textColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditCompanyModal;
