//#!/usr/bin/env node
import { program } from 'commander';
import axios from 'axios';
import inquirer from 'inquirer'; 

const searchBaseUrl = 'http://localhost:3000/api/search';
const advanceBaseUrl = 'http://localhost:3000/api/advance';

program.version('0.0.1');
program
  .command('search')
  .description('Search logs with full-text search or Multi Field filter logs')
  .action(async () => {
    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'Select the search type:',
        choices: [
          { name: 'Full-text search', value: 'fullText' },
          { name: 'Multi Field search', value: 'multiField' },
        ],
      },
    ]);

    if (searchType === 'fullText') {
       const { query } = await inquirer.prompt([
              {
                type: 'input',
                name: 'query',
                message: 'Enter the search query:',
              },
            ]);
  
        const baseUrl = searchBaseUrl;
        try {
            const response = await axios.get(`${baseUrl}?q=${query}`);
            console.log('Search results:');
            console.log(response.data);
          } catch (error) {
            console.error('Error searching logs:', error.response ? error.response.data : error.message);
          }
        
    }
    
      else if (searchType === 'multiField') {
        let filters = {};
    const questions = [
      {
        type: 'checkbox',
        name: 'fields',
        message: 'Select fields to filter:',
        choices: [
          { name: 'Resource ID', value: 'resourceId' },
          { name: 'Level', value: 'level' },
          { name: 'Date Range', value: 'dateRange' },
          { name: 'Message', value: 'message' },
          { name: 'Timestamp', value: 'timestamp' },
          { name: 'Trace ID', value: 'traceId' },
          { name: 'Span ID', value: 'spanId' },
          { name: 'Commit', value: 'commit' },
          { name: 'Metadata Parent Resource ID', value: 'parentResourceId' },
          
        ],
      },
    ];

    const { fields } = await inquirer.prompt(questions);
    console.log(fields) 
    if (fields.length > 0) {
      const filterOptions = [
        'resourceId',
        'level',
        'message',
        'timestamp',
        'traceId',
        'spanId',
        'commit',
        'parentResourceId',
      ];

      for (const field of filterOptions) {
        if (fields.includes(field)) {
          const { value } = await inquirer.prompt([
            {
              type: 'input',
              name: 'value',
              message: `Enter value for ${field}:`,
            },
          ]);
          filters[field] = value;
        }
      }
      if (fields.includes('dateRange')) {
        const { startDate, endDate } = await inquirer.prompt([
          {
            type: 'input',
            name: 'startDate',
            message: 'Enter starting date (YYYY-MM-DD):',
          },
          {
            type: 'input',
            name: 'endDate',
            message: 'Enter ending date (YYYY-MM-DD):',
          },
        ]);
        filters.timestamp = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          };
        }
      try {
        const baseUrl = advanceBaseUrl;
        const response = await axios.get(baseUrl, { params: filters });
        console.log('Multi Field search results:');
        console.log(response.data);
      } catch (error) {
        console.error('Error performing multi field search:', error.response ? error.response.data : error.message);
      }
    } else {
      console.log('No fields selected. Exiting.');
    }
    }
    });


program.parse(process.argv);
