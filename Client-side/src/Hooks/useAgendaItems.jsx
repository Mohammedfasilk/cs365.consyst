
import { useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useAgendaItems = () => {
  const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
  const user = '';
  const { toast } = useToast();

  const addAgendaItem = async (meetingId, item) => {
    if (!user) {
      console.error('No user found for agenda item creation');
      return;
    }

    setLoading(true);
    try {

      // Get the current max order_index for this meeting
    //   const { data: existingItems, error: fetchError } = await supabase
    //     .from('agenda_items')
    //     .select('order_index')
    //     .eq('meeting_id', meetingId)
    //     .order('order_index', { ascending: false })
    //     .limit(1);

      if (fetchError) {
        console.error('Error fetching existing agenda items:', fetchError);
        throw fetchError;
      }

      const nextOrderIndex = existingItems && existingItems.length > 0 
        ? (existingItems[0].order_index || 0) + 1 
        : 0;

    //   const { error } = await supabase
    //     .from('agenda_items')
    //     .insert({
    //       meeting_id: meetingId,
    //       item: item,
    //       order_index: nextOrderIndex,
    //     });

      if (error) {
        console.error('Agenda item creation error:', error);
        throw error;
      }

      console.log('Agenda item added successfully');
      
      toast({
        title: "Success",
        description: "Agenda item added successfully!",
      });
    } catch (error) {
      console.error('Error adding agenda item:', error);
      toast({
        title: "Error",
        description: "Failed to add agenda item. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateAgendaItem = async (itemId, item) => {
    if (!user) {
      console.error('No user found for agenda item update');
      return;
    }

    setLoading(true);
    try {
      console.log('Updating agenda item:', { itemId, item });

    //   const { error } = await supabase
    //     .from('agenda_items')
    //     .update({ item: item })
    //     .eq('id', itemId);

      if (error) {
        console.error('Agenda item update error:', error);
        throw error;
      }

      console.log('Agenda item updated successfully');
      
      toast({
        title: "Success",
        description: "Agenda item updated successfully!",
      });
    } catch (error) {
      console.error('Error updating agenda item:', error);
      toast({
        title: "Error",
        description: "Failed to update agenda item. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAgendaItem = async (itemId) => {
    if (!user) {
      console.error('No user found for agenda item deletion');
      return;
    }

    setLoading(true);
    try {
      console.log('Deleting agenda item:', itemId);

    //   const { error } = await supabase
    //     .from('agenda_items')
    //     .delete()
    //     .eq('id', itemId);

      if (error) {
        console.error('Agenda item deletion error:', error);
        throw error;
      }

      console.log('Agenda item deleted successfully');
      
      toast({
        title: "Success",
        description: "Agenda item deleted successfully!",
      });
    } catch (error) {
      console.error('Error deleting agenda item:', error);
      toast({
        title: "Error",
        description: "Failed to delete agenda item. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    addAgendaItem,
    updateAgendaItem,
    deleteAgendaItem,
    loading,
  };
};
