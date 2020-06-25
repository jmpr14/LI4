import React, { Component } from 'react';
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import { Receita } from './Receita'
import { Link, Redirect } from 'react-router-dom';

const Download = () => (
    <div>
        <PDFDownloadLink document={<Receita />} fileName="receita.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
    </div>
);

export default Download;