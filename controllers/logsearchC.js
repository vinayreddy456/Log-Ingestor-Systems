import Log from '../models/log-format.js'
export const FulltextSearch=async (req, res) => {
    try {
      const searchText = req.query.q; 
      console.log(searchText);
      if (!searchText) {
        return res.status(400).json({ message: 'Search text is required' });
      }
      const searchResults = await Log.find({ $text: { $search: searchText } });
  
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: 'Error searching logs', error });
    }
  }
export const Multisearch=async (req, res) => {
    try {
      const filters = {};
      if (req.query.level) {
        filters.level = req.query.level;
      }
      if (req.query.message) {
        filters.message = req.query.message;
      }
      if (req.query.resourceId) {
        filters.resourceId = req.query.resourceId;
      }
      if (req.query.timestamp) {
        filters.timestamp = req.query.timestamp; 
      }
      if (req.query.traceId) {
        filters.traceId = req.query.traceId;
      }
      if (req.query.spanId) {
        filters.spanId = req.query.spanId;
      }
      if (req.query.commit) {
        filters.commit = req.query.commit;
      }
      if (req.query.metadata) {
        filters.metadata = req.query.metadata;
      }
    if (Object.keys(filters).length === 0) {
        return res.status(400).json({ message: 'Search text is required' });
    }
    const searchResults = await Log.find(filters);

    res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: 'Error searching logs with filters', error });
    }
  }